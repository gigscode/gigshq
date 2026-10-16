import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const revalidate = 21600

const jobicyUrl = 'https://jobicy.com/api/v2/remote-jobs?count=200'
const sourceUrl = 'https://jobicy.com'
const jobicyListingPattern = /^https:\/\/jobicy\.com\/jobs\/[a-zA-Z0-9/_-]+$/

type JobicyJob = {
  id: string
  url: string
  title: string
  company: string
  location: string
  industries: string[]
  types: string[]
  excerpt: string
  salary: string | null
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

function formatSalary(job: Record<string, unknown>) {
  const min = typeof job.salaryMin === 'number' ? job.salaryMin : null
  const max = typeof job.salaryMax === 'number' ? job.salaryMax : null
  const currency = stringValue(job.salaryCurrency)
  const period = stringValue(job.salaryPeriod)
  if (min === null && max === null) return null
  const amount = min !== null && max !== null
    ? `${min.toLocaleString()}–${max.toLocaleString()}`
    : (min ?? max)?.toLocaleString() ?? ''
  return [currency, amount, period].filter(Boolean).join(' ')
}

function normalizeJob(value: unknown): JobicyJob | null {
  if (!value || typeof value !== 'object') return null
  const job = value as Record<string, unknown>
  const url = stringValue(job.url)
  if (!jobicyListingPattern.test(url)) return null

  const id = typeof job.id === 'number' || typeof job.id === 'string' ? String(job.id) : ''
  const title = stringValue(job.jobTitle)
  const company = stringValue(job.companyName)
  if (!id || !title || !company) return null

  return {
    id,
    url,
    title: title.slice(0, 250),
    company: company.slice(0, 160),
    location: stringValue(job.jobGeo).slice(0, 200) || 'Remote',
    industries: stringArray(job.jobIndustry),
    types: stringArray(job.jobType),
    excerpt: stringValue(job.jobExcerpt).slice(0, 1200),
    salary: formatSalary(job),
  }
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return responseError('Sign in to search remote jobs.', 401)

  try {
    const response = await fetch(jobicyUrl, {
      headers: { Accept: 'application/json' },
      cache: 'force-cache',
      next: { revalidate },
    })
    if (!response.ok) {
      console.error('Jobicy feed returned status.', response.status)
      return responseError('The remote job feed is temporarily unavailable. Try again later.', 502)
    }

    const payload: unknown = await response.json()
    if (!payload || typeof payload !== 'object' || !('jobs' in payload) || !Array.isArray(payload.jobs)) {
      console.error('Jobicy feed returned an unexpected response shape.')
      return responseError('The remote job feed returned an invalid response. Try again later.', 502)
    }

    const jobs = payload.jobs.map(normalizeJob).filter((job): job is JobicyJob => job !== null)
    const updatedAt = 'lastUpdate' in payload ? stringValue(payload.lastUpdate) : ''
    return NextResponse.json({
      jobs,
      updatedAt,
      sourceName: 'Jobicy',
      sourceUrl,
      notice: 'Public API listings cover jobs published in the last 7 days. Listings link to Jobicy; applications continue on the source listing.',
    }, {
      headers: { 'Cache-Control': 'private, no-store' },
    })
  } catch (error) {
    console.error('Could not fetch the Jobicy feed.', error)
    return responseError('Could not reach the remote job feed. Check your connection and try again.', 502)
  }
}
