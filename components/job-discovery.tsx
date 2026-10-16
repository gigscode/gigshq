'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Check, Clock3, LoaderCircle, Plus, RefreshCw, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { OpportunityFormValues } from '@/components/dashboard'

type RemoteJob = {
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

type FeedResponse = {
  jobs: RemoteJob[]
  updatedAt: string
  sourceName: string
  sourceUrl: string
  notice: string
}

type Category = 'all' | 'engineering' | 'design' | 'content'

const profileTerms = [
  'next.js', 'nextjs', 'react', 'typescript', 'javascript', 'frontend', 'front-end',
  'full stack', 'full-stack', 'web developer', 'software engineer', 'supabase',
  'wordpress', 'shopify', 'e-commerce', 'ecommerce', 'figma', 'ui/ux',
  'product designer', 'ux designer', 'email design', 'email marketing',
  'copywriter', 'copywriting', 'content writer', 'content strategist',
  'content strategy', 'social media', 'creator', 'ugc', 'web3',
]

const categories: { id: Category; label: string; terms: string[] }[] = [
  { id: 'all', label: 'All profile matches', terms: profileTerms },
  {
    id: 'engineering',
    label: 'Engineering & web',
    terms: ['next.js', 'nextjs', 'react', 'typescript', 'javascript', 'frontend', 'front-end', 'full stack', 'full-stack', 'web developer', 'software engineer', 'supabase', 'wordpress', 'shopify', 'e-commerce', 'ecommerce'],
  },
  {
    id: 'design',
    label: 'Design',
    terms: ['figma', 'ui/ux', 'product designer', 'ux designer', 'email design'],
  },
  {
    id: 'content',
    label: 'Content & marketing',
    terms: ['email marketing', 'copywriter', 'copywriting', 'content writer', 'content strategist', 'content strategy', 'social media', 'creator', 'ugc', 'web3'],
  },
]

function scoreJob(job: RemoteJob, terms: string[]) {
  const title = job.title.toLowerCase()
  const metadata = [...job.industries, ...job.types].join(' ').toLowerCase()
  const excerpt = job.excerpt.toLowerCase()
  return terms.reduce((score, term) => {
    if (title.includes(term)) return score + 4
    if (metadata.includes(term)) return score + 2
    if (excerpt.includes(term)) return score + 1
    return score
  }, 0)
}

function formatDate(value: string) {
  if (!value) return 'Date not provided'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Date not provided'
    : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}

function plainText(value: string) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 10000)
}

export function JobDiscovery({
  savedSourceUrls,
  onSave,
}: {
  savedSourceUrls: string[]
  onSave: (values: OpportunityFormValues) => Promise<boolean>
}) {
  const [jobs, setJobs] = useState<RemoteJob[]>([])
  const [updatedAt, setUpdatedAt] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingUrl, setSavingUrl] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')
  const [showAll, setShowAll] = useState(false)
  const savedUrls = useMemo(() => new Set(savedSourceUrls), [savedSourceUrls])

  async function loadJobs() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/jobs/jobicy')
      const payload: unknown = await response.json()
      if (!response.ok) {
        const message = payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string'
          ? payload.error
          : 'Could not load remote jobs.'
        throw new Error(message)
      }
      if (!payload || typeof payload !== 'object' || !('jobs' in payload) || !Array.isArray(payload.jobs)
        || !('updatedAt' in payload) || typeof payload.updatedAt !== 'string') {
        throw new Error('The job feed returned an unexpected response.')
      }
      const result = payload as FeedResponse
      setJobs(result.jobs)
      setUpdatedAt(result.updatedAt)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not load remote jobs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadJobs()
  }, [])

  const terms = categories.find((item) => item.id === category)?.terms ?? profileTerms
  const filteredJobs = useMemo(() => jobs
    .map((job) => ({ job, score: scoreJob(job, terms) }))
    .filter(({ job, score }) => (showAll || score > 0)
      && `${job.title} ${job.company} ${job.location} ${job.industries.join(' ')} ${job.types.join(' ')} ${job.excerpt}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((left, right) => right.score - left.score || left.job.title.localeCompare(right.job.title)),
  [jobs, terms, showAll, query])

  async function saveJob(job: RemoteJob) {
    setSavingUrl(job.url)
    setError('')
    const saved = await onSave({
      company_name: job.company,
      title: job.title,
      description: plainText(job.excerpt) || null,
      source_name: 'Jobicy',
      source_url: job.url,
      contact_name: null,
      contact_email: null,
      compensation: job.salary,
    })
    if (!saved) setError(`Could not save ${job.title}. Check the error shown above and try again.`)
    setSavingUrl('')
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Live remote job feed</p>
          </div>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">Find roles that match your skills</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
            Latest listings from Jobicy are matched against your web, design, and content skills. Keyword matches help sort the list; they are not an AI fit score.
          </p>
        </div>
        <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => void loadJobs()} disabled={loading}>
          {loading ? <LoaderCircle aria-hidden="true" data-icon="inline-start" className="animate-spin" /> : <RefreshCw aria-hidden="true" data-icon="inline-start" />}
          {loading ? 'Loading listings…' : 'Refresh listings'}
        </Button>
      </section>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

      <section aria-label="Filter job listings" className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 px-3 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
            <Search aria-hidden="true" className="size-4 shrink-0 text-slate-400" />
            <span className="sr-only">Search jobs</span>
            <Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" placeholder="Search title, company, location, or description" />
          </label>
          <label className="flex min-h-11 items-center rounded-lg border border-slate-200 px-3 text-sm text-slate-600">
            <span className="sr-only">Filter by skill category</span>
            <select aria-label="Filter by skill category" value={category} onChange={(event) => setCategory(event.target.value as Category)} className="h-full bg-transparent outline-none">
              {categories.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm text-slate-600">
            <input type="checkbox" checked={showAll} onChange={(event) => setShowAll(event.target.checked)} className="size-4 accent-violet-700" />
            Show all listings
          </label>
        </div>
      </section>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-950">{filteredJobs.length} {filteredJobs.length === 1 ? 'listing' : 'listings'}</h2>
          <p className="mt-1 text-sm text-slate-600">{showAll ? 'Showing all recently published roles.' : 'Showing roles with profile keyword matches.'}</p>
        </div>
        {updatedAt && (
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock3 aria-hidden="true" className="size-3.5" />Feed updated {formatDate(updatedAt)}
          </p>
        )}
      </div>

      {loading ? (
        <div role="status" className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center text-sm text-slate-600">
          <LoaderCircle aria-hidden="true" className="mx-auto mb-3 size-5 animate-spin text-violet-700" />Loading Jobicy listings…
        </div>
      ) : filteredJobs.length ? (
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filteredJobs.map(({ job, score }) => {
            const saved = savedUrls.has(job.url)
            const matches = terms.filter((term) => `${job.title} ${job.location} ${job.industries.join(' ')} ${job.types.join(' ')} ${job.excerpt}`.toLowerCase().includes(term))
            return (
              <Card key={job.id} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-600">{job.company}</p>
                      <h3 className="mt-1 text-lg font-bold leading-6 text-slate-950">{job.title}</h3>
                    </div>
                    {score > 0 && <Badge variant="outline" className="shrink-0">{matches.length} skill {matches.length === 1 ? 'match' : 'matches'}</Badge>}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="secondary">{job.location}</Badge>
                    {job.types.slice(0, 2).map((type) => <Badge key={type} variant="outline">{type}</Badge>)}
                    {job.industries.slice(0, 2).map((industry) => <Badge key={industry} variant="outline">{industry}</Badge>)}
                  </div>

                  {job.excerpt && <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">{plainText(job.excerpt)}</p>}
                  {job.salary && <p className="mt-3 text-sm font-medium text-slate-800">Listed compensation: {job.salary}</p>}

                  <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                    <a href={job.url} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-violet-800 px-3 text-sm font-medium text-white hover:bg-violet-900">
                      View & apply on Jobicy <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-auto"
                      disabled={saved || savingUrl !== ''}
                      onClick={() => void saveJob(job)}
                    >
                      {savingUrl === job.url ? <LoaderCircle aria-hidden="true" data-icon="inline-start" className="animate-spin" /> : saved ? <Check aria-hidden="true" data-icon="inline-start" /> : <Plus aria-hidden="true" data-icon="inline-start" />}
                      {savingUrl === job.url ? 'Saving…' : saved ? 'Saved' : 'Save lead'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <BriefcaseBusiness aria-hidden="true" className="mx-auto size-6 text-slate-400" />
          <h3 className="mt-3 text-sm font-semibold text-slate-900">{jobs.length ? 'No matching listings' : 'No remote jobs found'}</h3>
          <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
            {jobs.length ? 'Try a different keyword or turn on “Show all listings”.' : 'The feed returned no listings. Try refreshing later.'}
          </p>
        </div>
      )}

      <p className="text-xs leading-5 text-slate-500">
        Job listings provided by <a href="https://jobicy.com" target="_blank" rel="noreferrer" className="font-medium text-violet-800 underline underline-offset-2">Jobicy</a>. Feed data is cached for up to 6 hours. Check the source listing for current status and application details.
      </p>
    </div>
  )
}
