import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getTargetJobCategories, type TargetJobCategory } from '@/lib/jobs/profile'

export const runtime = 'nodejs'
export const revalidate = 21600

const jobicyEndpoint = 'https://jobicy.com/api/v2/remote-jobs'
const remoteOkEndpoint = 'https://remoteok.com/api'
const jobicyListingPattern = /^https:\/\/jobicy\.com\/jobs\/[a-zA-Z0-9/_-]+$/
const remoteOkListingPattern = /^https:\/\/remoteok\.com\/remote-jobs\/[a-zA-Z0-9/_-]+$/i

export type JobListing = {
  id: string
  url: string
  title: string
  company: string
  location: string
  industries: string[]
  types: string[]
  excerpt: string
  salary: string | null
  publishedAt: string | null
  sourceName: 'Jobicy' | 'Remote OK'
  targetCategories: TargetJobCategory[]
}

type NormalizedJobListing = Omit<JobListing, 'targetCategories'>

type SourceResult = {
  jobs: JobListing[]
  updatedAt: string
  nextCursor: string | null
}

function responseError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

function stringValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function stringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean).slice(0, 12)
    : []
}

function formatSalary(min: unknown, max: unknown, currencyValue: unknown, periodValue: unknown) {
  const salaryMin = typeof min === 'number' && min > 0 ? min : null
  const salaryMax = typeof max === 'number' && max > 0 ? max : null
  const currency = stringValue(currencyValue)
  const period = stringValue(periodValue)
  if (salaryMin === null && salaryMax === null) return null
  const amount = salaryMin !== null && salaryMax !== null
    ? `${salaryMin.toLocaleString()}–${salaryMax.toLocaleString()}`
    : (salaryMin ?? salaryMax)?.toLocaleString() ?? ''
  return [currency, amount, period].filter(Boolean).join(' ')
}

function normalizeJobicyJob(value: unknown): NormalizedJobListing | null {
  if (!value || typeof value !== 'object') return null
  const job = value as Record<string, unknown>
  const url = stringValue(job.url)
  if (!jobicyListingPattern.test(url)) return null

  const id = typeof job.id === 'number' || typeof job.id === 'string' ? String(job.id) : ''
  const title = stringValue(job.jobTitle)
  const company = stringValue(job.companyName)
  if (!id || !title || !company) return null

  return {
    id: `jobicy-${id}`,
    url,
    title: title.slice(0, 250),
    company: company.slice(0, 160),
    location: stringValue(job.jobGeo).slice(0, 200) || 'Remote · eligibility not specified',
    industries: stringArray(job.jobIndustry),
    types: stringArray(job.jobType),
    excerpt: stringValue(job.jobExcerpt).slice(0, 1200),
    salary: formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod),
    publishedAt: stringValue(job.pubDate) || null,
    sourceName: 'Jobicy',
  }
}

function normalizeRemoteOkJob(value: unknown): NormalizedJobListing | null {
  if (!value || typeof value !== 'object') return null
  const job = value as Record<string, unknown>
  const url = stringValue(job.url)
  if (!remoteOkListingPattern.test(url)) return null

  const id = typeof job.id === 'number' || typeof job.id === 'string' ? String(job.id) : ''
  const title = stringValue(job.position)
  const company = stringValue(job.company)
  if (!id || !title || !company) return null

  return {
    id: `remoteok-${id}`,
    url,
    title: title.slice(0, 250),
    company: company.slice(0, 160),
    location: stringValue(job.location).slice(0, 200) || 'Remote · eligibility not specified',
    industries: stringArray(job.tags),
    types: [],
    excerpt: stringValue(job.description).slice(0, 1200),
    salary: formatSalary(job.salary_min, job.salary_max, null, null),
    publishedAt: stringValue(job.date) || null,
    sourceName: 'Remote OK',
  }
}

async function fetchJobicyPage(cursor: string | null): Promise<SourceResult> {
  const url = new URL(jobicyEndpoint)
  url.searchParams.set('count', '200')
  if (cursor) url.searchParams.set('cursor', cursor)

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate },
  })
  if (!response.ok) throw new Error(`Jobicy returned HTTP ${response.status}.`)

  const payload: unknown = await response.json()
  if (!payload || typeof payload !== 'object' || !('jobs' in payload) || !Array.isArray(payload.jobs)) {
    throw new Error('Jobicy returned an unexpected response.')
  }

  const jobs = payload.jobs
    .map((value) => {
      const job = normalizeJobicyJob(value)
      if (!job || !value || typeof value !== 'object') return null
      const details = stringValue((value as Record<string, unknown>).jobDescription).slice(0, 8000)
      const targetCategories = getTargetJobCategories(
        job.title,
        `${job.excerpt} ${details}`,
        [...job.industries, ...job.types],
      )
      return targetCategories.length ? { ...job, targetCategories } : null
    })
    .filter((job): job is JobListing => job !== null)

  return {
    jobs,
    updatedAt: 'lastUpdate' in payload ? stringValue(payload.lastUpdate) : '',
    nextCursor: 'nextCursor' in payload && typeof payload.nextCursor === 'string' ? payload.nextCursor : null,
  }
}

async function fetchRemoteOk(): Promise<SourceResult> {
  const response = await fetch(remoteOkEndpoint, {
    headers: { Accept: 'application/json' },
    next: { revalidate },
  })
  if (!response.ok) throw new Error(`Remote OK returned HTTP ${response.status}.`)

  const payload: unknown = await response.json()
  if (!Array.isArray(payload)) throw new Error('Remote OK returned an unexpected response.')

  const jobs = payload
    .map((value) => {
      const job = normalizeRemoteOkJob(value)
      if (!job || !value || typeof value !== 'object') return null
      const details = stringValue((value as Record<string, unknown>).description).slice(0, 8000)
      const targetCategories = getTargetJobCategories(
        job.title,
        details,
        [...job.industries, ...job.types],
      )
      return targetCategories.length ? { ...job, targetCategories } : null
    })
    .filter((job): job is JobListing => job !== null)
  const feedTimestamp = payload.find((item) => item && typeof item === 'object' && 'last_updated' in item)
  const updatedAt = feedTimestamp && typeof feedTimestamp === 'object' && typeof feedTimestamp.last_updated === 'number'
    ? new Date(feedTimestamp.last_updated * 1000).toISOString()
    : ''

  return { jobs, updatedAt, nextCursor: null }
}

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return responseError('Sign in to search remote jobs.', 401)

  const requestedCursor = new URL(request.url).searchParams.get('cursor')
  if (requestedCursor && requestedCursor.length > 2000) return responseError('Invalid job feed cursor.', 400)

  const results = await Promise.allSettled([
    fetchJobicyPage(requestedCursor),
    requestedCursor ? Promise.resolve(null) : fetchRemoteOk(),
  ])

  const jobicyResult = results[0]
  const remoteOkResult = results[1]
  const jobs: JobListing[] = []
  const sourceErrors: string[] = []
  let updatedAt = ''
  let nextCursor: string | null = null

  if (jobicyResult.status === 'fulfilled') {
    jobs.push(...jobicyResult.value.jobs)
    updatedAt = jobicyResult.value.updatedAt
    nextCursor = jobicyResult.value.nextCursor
  } else {
    console.error('Could not retrieve the Jobicy job feed.', jobicyResult.reason)
    sourceErrors.push('Jobicy listings could not be loaded.')
  }

  if (remoteOkResult.status === 'fulfilled' && remoteOkResult.value) {
    jobs.push(...remoteOkResult.value.jobs)
    if (remoteOkResult.value.updatedAt && (!updatedAt || remoteOkResult.value.updatedAt > updatedAt)) {
      updatedAt = remoteOkResult.value.updatedAt
    }
  } else if (remoteOkResult.status === 'rejected') {
    console.error('Could not retrieve the Remote OK job feed.', remoteOkResult.reason)
    sourceErrors.push('Remote OK listings could not be loaded.')
  }

  if (jobs.length === 0 && sourceErrors.length > 0) {
    return responseError('Job feeds are temporarily unavailable. Try again later.', 502)
  }

  const uniqueJobs = Array.from(new Map(jobs.map((job) => [job.url, job])).values())
  return NextResponse.json({
    jobs: uniqueJobs,
    updatedAt,
    nextCursor,
    sourceErrors,
    notice: 'Jobicy and Remote OK listings. Each source is credited and the application link goes to the original listing. Verify location eligibility and availability on the source.',
  }, {
    headers: { 'Cache-Control': 'private, no-store' },
  })
}
