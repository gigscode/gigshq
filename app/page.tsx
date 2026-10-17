'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BookmarkCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Globe,
  MapPin,
  Search,
  Send,
  Sparkles,
  Zap,
} from 'lucide-react'
import { JobCard, JobDetailModal, type JobCardData } from '@/components/job-card'

/* ─────────────────────────────────────────
   Sticky-nav: applies a translucent backdrop
   once the user scrolls past the fold a bit.
───────────────────────────────────────── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-[#e8e6df]/80 bg-[#fbfaf7]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" aria-label="GigsHQ home" className="group flex items-center gap-2.5">
          <Image
            src="/gigshqicon.png"
            alt=""
            width={36}
            height={36}
            className="rounded-xl transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-[1.1rem] font-extrabold tracking-tight text-[#18231f]">
            gigs<span className="text-[#573da5]">hq</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-6">
          <a
            href="#how-it-works"
            className="hidden text-sm font-semibold text-[#56615c] transition-colors hover:text-[#18231f] sm:inline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#573da5] rounded"
          >
            How it works
          </a>
          <a
            href="#latest-jobs"
            className="hidden text-sm font-semibold text-[#56615c] transition-colors hover:text-[#18231f] md:inline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#573da5] rounded"
          >
            Latest jobs
          </a>
          <a
            href="#transparency"
            className="hidden text-sm font-semibold text-[#56615c] transition-colors hover:text-[#18231f] lg:inline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#573da5] rounded"
          >
            Transparency
          </a>
          <Link
            href="/login"
            className="text-sm font-semibold text-[#56615c] transition-colors hover:text-[#18231f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#573da5] rounded px-1"
          >
            Sign in
          </Link>
          <Link
            href="/login?mode=sign-up"
            className="inline-flex min-h-[2.4rem] items-center gap-1.5 rounded-xl bg-[#573da5] px-4 text-sm font-bold text-white shadow-[0_4px_14px_-4px_rgba(87,61,165,.6)] transition-all hover:-translate-y-px hover:bg-[#463087] hover:shadow-[0_6px_18px_-4px_rgba(87,61,165,.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#573da5]"
          >
            Get started <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

/* ─────────────────────────────────────────
   Accordion item for the FAQ / Transparency
   section. Keyboard & mouse accessible.
───────────────────────────────────────── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${question.slice(0, 20).replace(/\s/g, '-').toLowerCase()}`

  return (
    <div className="border-b border-[#e8e6df] last:border-0">
      <button
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-[#573da5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#573da5] rounded"
      >
        <span className="text-sm font-bold text-[#253129]">{question}</span>
        <ChevronDown
          aria-hidden="true"
          className={`mt-0.5 size-5 shrink-0 text-[#6549ad] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={id}
        className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}
      >
        <p className="text-sm leading-7 text-[#68736c]">{answer}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Sample Curated Jobs (Matching Reference Design & Clickable)
───────────────────────────────────────── */
const allCuratedJobs: JobCardData[] = [
  {
    id: 'job-1',
    title: 'Ui/Ux Designer Web',
    company: 'Webflow',
    category: 'Design',
    logoBg: 'bg-[#4353ff]',
    logoText: 'W',
    type: 'Full Time',
    location: 'Chicago',
    salary: '$450 - $500 / month',
    deadlineOrDate: '56 days left to apply',
    skills: ['Figma', 'Webflow CMS', 'UI Systems', 'Interaction Design', 'Responsive Prototyping'],
    description: 'Webflow is seeking a UI/UX Designer to craft world-class web experiences, responsive page components, and modern interactive modules for global customers.',
    responsibilities: [
      'Design clean, accessible web components and interface layouts in Figma and Webflow.',
      'Work alongside marketing and engineering teams on high-impact web initiatives.',
      'Conduct usability reviews and maintain design system tokens for consistency.',
    ],
  },
  {
    id: 'job-2',
    title: 'Ui/Ux Designer Web',
    company: 'Canva',
    category: 'Design',
    logoBg: 'bg-gradient-to-tr from-amber-500 to-orange-500',
    logoText: 'C',
    type: 'Full Time',
    location: 'Chicago',
    salary: '$450 - $500 / month',
    deadlineOrDate: '56 days left to apply',
    skills: ['Visual Design', 'Web Apps', 'Design Systems', 'Micro-interactions', 'User Testing'],
    description: 'Canva is expanding its core creative tooling and seeking a talented web designer to shape responsive user workflows and creative canvas interfaces.',
    responsibilities: [
      'Create polished user journey prototypes and interactive micro-animations.',
      'Collaborate with remote product engineers across international time zones.',
      'Refine existing UI patterns to streamline creator workflows.',
    ],
  },
  {
    id: 'job-3',
    title: 'Ui/Ux Designer Web',
    company: 'Aon',
    category: 'Design',
    logoBg: 'bg-slate-900',
    logoText: '▲',
    type: 'Full Time',
    location: 'Chicago',
    salary: '$450 - $500 / month',
    deadlineOrDate: '56 days left to apply',
    skills: ['Enterprise UX', 'Design Thinking', 'Accessibility (WCAG)', 'Information Architecture'],
    description: 'Join Aon’s remote digital product team to simplify complex enterprise risk analysis workflows into modern, intuitive user interfaces.',
    responsibilities: [
      'Translate data-heavy risk reports into responsive, readable dashboards.',
      'Establish enterprise WCAG AA accessibility standards across customer portals.',
      'Partner with cross-functional stakeholders on UX research and feedback loops.',
    ],
  },
  {
    id: 'job-4',
    title: 'Ui/Ux Designer Web',
    company: 'Slack',
    category: 'Design',
    logoBg: 'bg-[#4a154b]',
    logoText: 'S',
    type: 'Full Time',
    location: 'Chicago',
    salary: '$450 - $500 / month',
    deadlineOrDate: '56 days left to apply',
    skills: ['Figma', 'Design Systems', 'Product Design', 'Collaboration Tools', 'Typography'],
    description: 'Slack is hiring a UI/UX Web Designer to focus on productivity surfaces, desktop web integration, and customer onboarding journeys.',
    responsibilities: [
      'Prototype new interaction patterns for asynchronous communication tools.',
      'Enhance design system documentation and reusable component libraries.',
      'Partner with UX researchers to validate interface usability.',
    ],
  },
  {
    id: 'job-5',
    title: 'Senior Frontend Engineer',
    company: 'Linear',
    category: 'Engineering',
    logoBg: 'bg-indigo-600',
    logoText: 'L',
    type: 'Full Time',
    location: 'Remote · Worldwide',
    salary: '$5,500 - $7,000 / month',
    deadlineOrDate: '42 days left to apply',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Web Performance', 'State Management'],
    description: 'Linear is looking for a thoughtful frontend engineer who obsesses over keyboard navigation, sub-100ms interactions, and rock-solid web architecture.',
    responsibilities: [
      'Build snappy, offline-first client interfaces using React and TypeScript.',
      'Optimize rendering pipelines and keyboard shortcuts for lightning-fast issue tracking.',
      'Ship clean, maintainable code with thorough unit and integration testing.',
    ],
  },
  {
    id: 'job-6',
    title: 'Full-Stack Web Developer',
    company: 'Supabase',
    category: 'Engineering',
    logoBg: 'bg-gradient-to-tr from-emerald-600 to-teal-500',
    logoText: 'S',
    type: 'Full Time',
    location: 'Nigeria · Remote',
    salary: '$4,800 - $6,500 / month',
    deadlineOrDate: '30 days left to apply',
    skills: ['Next.js', 'PostgreSQL', 'TypeScript', 'Auth Systems', 'REST & GraphQL'],
    description: 'Supabase empowers developers to build faster. We are seeking a full-stack engineer in Africa to develop dashboard features and developer tools.',
    responsibilities: [
      'Develop cloud database dashboard management views and analytics charts.',
      'Maintain reliable API endpoints and database migration scripts.',
      'Engage with open-source community contributors and address technical issues.',
    ],
  },
  {
    id: 'job-7',
    title: 'Product Marketing Lead',
    company: 'Buffer',
    category: 'Marketing',
    logoBg: 'bg-sky-500',
    logoText: 'B',
    type: 'Full Time',
    location: 'Remote · Worldwide',
    salary: '$4,000 - $5,500 / month',
    deadlineOrDate: '24 days left to apply',
    skills: ['Product Messaging', 'Launch Strategy', 'SaaS Growth', 'Content Strategy'],
    description: 'Buffer is an all-remote pioneer looking for a passionate product marketer to drive feature adoption, product launches, and narrative positioning.',
    responsibilities: [
      'Formulate go-to-market strategies for quarterly product releases.',
      'Craft compelling customer case studies, release notes, and email briefings.',
      'Analyze customer onboarding funnels to optimize activation rates.',
    ],
  },
  {
    id: 'job-8',
    title: 'WordPress & React Specialist',
    company: 'Automattic',
    category: 'Websites',
    logoBg: 'bg-blue-600',
    logoText: 'W',
    type: 'Contract',
    location: 'Remote · Worldwide',
    salary: '$3,800 - $5,200 / month',
    deadlineOrDate: '18 days left to apply',
    skills: ['Gutenberg', 'React', 'PHP', 'Headless WordPress', 'Performance Tuning'],
    description: 'Automattic is seeking a WordPress & React developer to build modern custom block themes and high-traffic publisher solutions.',
    responsibilities: [
      'Develop custom Gutenberg blocks with React and Tailwind CSS.',
      'Audit and optimize Core Web Vitals for global enterprise sites.',
      'Contribute to open-source WordPress core projects and theme repositories.',
    ],
  },
  {
    id: 'job-9',
    title: 'Email & Klaviyo Strategist',
    company: 'DTC Brands',
    category: 'Marketing',
    logoBg: 'bg-rose-500',
    logoText: 'K',
    type: 'Contract',
    location: 'Remote · Worldwide',
    salary: '$3,500 - $4,800 / month',
    deadlineOrDate: '35 days left to apply',
    skills: ['Klaviyo', 'Email Automation', 'Copywriting', 'A/B Testing', 'Retention'],
    description: 'Lead retention and lifecycle marketing for high-growth e-commerce brands utilizing advanced Klaviyo flows and segmentation.',
    responsibilities: [
      'Architect automated customer journeys (welcome series, win-backs, abandoned carts).',
      'Conduct rigorous split-tests on subject lines, creative templates, and send times.',
      'Report on monthly attribution, open rates, and customer lifetime value.',
    ],
  },
  {
    id: 'job-10',
    title: 'Technical Content Writer',
    company: 'Stripe',
    category: 'Content',
    logoBg: 'bg-violet-700',
    logoText: 'S',
    type: 'Full Time',
    location: 'Remote · Worldwide',
    salary: '$4,500 - $6,000 / month',
    deadlineOrDate: '29 days left to apply',
    skills: ['Technical Writing', 'API Documentation', 'Developer Guides', 'Code Samples'],
    description: 'Help global developers integrate financial infrastructure by authoring clear, concise guides, reference documentation, and interactive tutorials.',
    responsibilities: [
      'Author developer-first tutorials for modern payment integrations.',
      'Review engineering pull requests for technical clarity and documentation quality.',
      'Maintain developer API reference changelogs and SDK migration notes.',
    ],
  },
  {
    id: 'job-11',
    title: 'Brand & Visual Designer',
    company: 'Figma',
    category: 'Design',
    logoBg: 'bg-gradient-to-tr from-rose-500 via-purple-500 to-blue-500',
    logoText: 'F',
    type: 'Full Time',
    location: 'Remote · Worldwide',
    salary: '$5,000 - $7,000 / month',
    deadlineOrDate: '48 days left to apply',
    skills: ['Brand Identity', 'Illustration', 'Figma', 'Motion Design', 'Typography'],
    description: 'Figma is hiring a Visual Designer to shape brand campaign assets, community event graphics, and interactive web landing pages.',
    responsibilities: [
      'Develop expressive visual identities for product feature announcements.',
      'Collaborate with content strategists on compelling visual storytelling.',
      'Maintain an organized digital asset library for global marketing campaigns.',
    ],
  },
  {
    id: 'job-12',
    title: 'Customer Onboarding Lead',
    company: 'Loom',
    category: 'Support',
    logoBg: 'bg-amber-500',
    logoText: 'L',
    type: 'Full Time',
    location: 'Remote · Africa & EU',
    salary: '$3,800 - $5,000 / month',
    deadlineOrDate: '21 days left to apply',
    skills: ['Customer Success', 'Technical Support', 'Onboarding Funnels', 'Async Video'],
    description: 'Guide new enterprise teams to successfully implement asynchronous video messaging across their organizations.',
    responsibilities: [
      'Lead interactive onboarding webinars and product walkthroughs.',
      'Create step-by-step help center articles and video explainers.',
      'Gather user feedback to advocate for customer-requested product enhancements.',
    ],
  },
]

/* ─────────────────────────────────────────
   Main page
───────────────────────────────────────── */
export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activePage, setActivePage] = useState<number>(0)
  const [selectedJob, setSelectedJob] = useState<JobCardData | null>(null)
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set())
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Filter jobs by selected category tab
  const filteredJobs = allCuratedJobs.filter((job) => {
    if (activeCategory === 'all') return true
    return job.category.toLowerCase() === activeCategory.toLowerCase()
  })

  // Paginate 4 cards per page (matching 2x2 grid in reference design)
  const pageSize = 4
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize))
  const displayedJobs = filteredJobs.slice(
    activePage * pageSize,
    (activePage + 1) * pageSize
  )

  // When category changes, reset to page 0
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setActivePage(0)
  }

  // Handle saving a job with reactive feedback
  const handleSaveToggle = (id: string, saved: boolean) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev)
      if (saved) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })

    const targetJob = allCuratedJobs.find((j) => j.id === id)
    if (saved && targetJob) {
      setToastMessage(`✨ Saved "${targetJob.title}" at ${targetJob.company} to your leads`)
      setTimeout(() => setToastMessage(null), 4500)
    }
  }

  return (
    <div className="overflow-hidden bg-[#fbfaf7] text-[#18231f]">
      <NavBar />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14 lg:grid-cols-[1fr_.92fr] lg:items-center lg:gap-10 lg:px-12 lg:pb-32 lg:pt-16">

        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-10 size-[34rem] rounded-full bg-gradient-to-br from-[#e8e4f5]/60 to-[#d9f0d9]/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/3 top-1/2 size-80 rounded-full bg-[#e8e4f5]/20 blur-3xl"
        />

        {/* Left — copy */}
        <div className="relative z-10 max-w-2xl">
          {/* Status badge */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#ddd8ec] bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-[#573da5] shadow-sm backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6aab78] opacity-75 [animation-duration:2s]" />
              <span className="relative inline-flex size-2 rounded-full bg-[#6aab78]" />
            </span>
            A job-search workspace built for Africa&rsquo;s remote-work journey
          </div>

          <h1 className="max-w-2xl text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-[.98] tracking-[-0.06em] text-[#17231e]">
            Find your next<br />
            remote role.{' '}
            <span className="relative inline-block text-[#6549ad]">
              Keep the{' '}
              <span
                aria-hidden="true"
                className="absolute bottom-[0.06em] left-0 h-[0.1em] w-full rounded-full bg-[#6549ad]/20"
              />
              search moving.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#58635d] sm:text-lg sm:leading-8">
            Discover remote digital opportunities, save the ones worth pursuing, and keep your applications organized — all in one personal workspace.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/login?mode=sign-up"
              className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-xl bg-[#573da5] px-7 text-sm font-bold text-white shadow-[0_12px_28px_-10px_rgba(87,61,165,.75)] transition-all hover:-translate-y-0.5 hover:bg-[#463087] hover:shadow-[0_16px_32px_-10px_rgba(87,61,165,.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#573da5]"
            >
              Start your search <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              href="#latest-jobs"
              className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-[#38443e] ring-1 ring-[#e4e1d9] transition-all hover:bg-white hover:ring-[#cac7c0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#573da5]"
            >
              Explore latest jobs
            </a>
          </div>

          <p className="mt-5 max-w-lg text-xs leading-5 text-[#8a938d]">
            Location filters are a starting point, not an eligibility guarantee. Always confirm requirements with the employer.
          </p>

          {/* Stats strip */}
          <div className="mt-10 flex flex-wrap gap-6 border-t border-[#e8e6df] pt-8">
            {[
              { label: 'Remote-first feeds', value: 'Curated' },
              { label: 'Application tracker', value: 'Built-in' },
              { label: 'Free to use', value: 'Always' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-lg font-extrabold tracking-tight text-[#17231e]">
                  {value}
                </span>
                <span className="text-xs text-[#8a938d]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Interactive UI mock with Clickable JobCard */}
        <div className="relative z-10 mx-auto w-full max-w-[540px] lg:ml-auto">
          {/* Decorative rings */}
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-8 size-36 rounded-full border border-[#d5e2d5]/60 sm:-right-10 sm:-top-12 sm:size-52"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -left-6 size-28 rounded-full bg-[#e8eee4]/70 sm:-bottom-10 sm:-left-10 sm:size-40"
          />
          {/* Floating tag — workspace type */}
          <div
            aria-hidden="true"
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full border border-[#ddd8ec] bg-white/95 px-4 py-2 text-xs font-bold text-[#573da5] shadow-sm backdrop-blur-sm sm:-top-5"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            Your personal opportunity workspace
          </div>

          {/* Card shell */}
          <div className="relative mt-6 rounded-[1.75rem] border border-[#e6e3dc] bg-white shadow-[0_32px_80px_-36px_rgba(37,46,39,.40)] sm:rounded-[2rem]">

            {/* Card header */}
            <div className="flex items-center justify-between border-b border-[#eeece7] px-5 py-4">
              <div>
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[.18em] text-[#69746d]">Opportunity workspace</p>
                <p className="mt-0.5 text-sm font-bold text-[#202c26]">Your search, in one place</p>
              </div>
              <span className="rounded-full bg-[#f0edf8] px-3 py-1.5 text-xs font-bold text-[#573da5]">Personal</span>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-3 gap-2 p-4">
              {[
                { icon: Search, label: 'Discover', active: true },
                { icon: BookmarkCheck, label: 'Saved leads', active: false },
                { icon: BriefcaseBusiness, label: 'Track', active: false },
              ].map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  aria-hidden="true"
                  className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-bold sm:gap-2 ${
                    active
                      ? 'border-[#ded7f0] bg-[#f6f3fb] text-[#573da5]'
                      : 'border-[#eeece7] bg-[#fdfdfc] text-[#66716a]'
                  }`}
                >
                  <Icon aria-hidden="true" className="size-3.5" />
                  {label}
                </div>
              ))}
            </div>

            {/* Search bar */}
            <div className="mx-4 mb-3 rounded-2xl bg-[#f6f7f3] p-3.5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold text-[#29352e]">A focused search</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#56615c]">
                  <Globe aria-hidden="true" className="size-3 text-[#6549ad]" />
                  Nigeria · Africa · Worldwide
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#e7e8e2] bg-white px-3 py-2.5">
                <Search aria-hidden="true" className="size-3.5 shrink-0 text-[#879088]" />
                <span className="text-xs text-[#69746d]">Role, skill, or company…</span>
              </div>
            </div>

            {/* Clickable Job Card in Hero */}
            <div className="mx-4 mb-4">
              <JobCard
                job={allCuratedJobs[0]}
                initiallySaved={savedJobIds.has(allCuratedJobs[0].id)}
                onSaveToggle={handleSaveToggle}
                onClick={(job) => setSelectedJob(job)}
              />
            </div>

            <p className="px-4 pb-4 pt-0 text-center text-[0.72rem] font-semibold text-[#573da5]">
              👉 Click card to open full role preview · Click heart to save lead
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SOCIAL PROOF / TRUST STRIP
      ══════════════════════════════════════ */}
      <div className="border-y border-[#e8e6df] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
            {[
              { icon: Search, text: 'Search curated remote feeds' },
              { icon: BookmarkCheck, text: 'Save promising opportunities' },
              { icon: Send, text: 'Track every application step' },
              { icon: Zap, text: 'Free to get started' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs font-semibold text-[#56615c]">
                <Icon aria-hidden="true" className="size-3.5 text-[#6549ad]" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          LATEST JOBS SHOWCASE (Reference Design Match & Fully Interactive)
      ══════════════════════════════════════ */}
      <section id="latest-jobs" className="bg-[#fbfaf7] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Header row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  Latest jobs
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Live feed
                </span>
              </div>
              <p className="mt-1.5 text-sm font-medium text-slate-500 sm:text-base">
                2020 jobs live – 293 added today. Click any card to preview.
              </p>
            </div>
            <Link
              href="/login?mode=sign-up"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#0d9488] underline underline-offset-4 decoration-2 decoration-[#0d9488] transition-colors hover:text-[#0f766e] hover:decoration-[#0f766e]"
            >
              View all jobs <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All roles' },
              { id: 'Design', label: 'Design' },
              { id: 'Engineering', label: 'Engineering' },
              { id: 'Marketing', label: 'Marketing' },
              { id: 'Websites', label: 'Websites' },
            ].map(({ id, label }) => {
              const active = activeCategory === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleCategoryChange(id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#573da5] ${
                    active
                      ? 'bg-[#573da5] text-white shadow-xs'
                      : 'border border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* 2x2 Grid of Clickable, Colorful & Engaging Cards */}
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {displayedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                initiallySaved={savedJobIds.has(job.id)}
                onSaveToggle={handleSaveToggle}
                onClick={(selected) => setSelectedJob(selected)}
              />
            ))}
          </div>

          {/* Pagination dots (matching reference) */}
          {totalPages > 1 && (
            <div className="mt-9 flex items-center justify-center gap-2.5">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActivePage(index)}
                  aria-label={`Show job set ${index + 1}`}
                  className={`transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d9488] ${
                    activePage === index
                      ? 'h-2 w-7 rounded-full bg-[#0d9488]'
                      : 'size-2 rounded-full bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how-it-works" className="border-t border-[#e8e6df] bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#6549ad]">From search to application</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.045em] text-[#1c2922] sm:text-4xl lg:text-5xl">
              See your job search take shape.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#637067]">
              Find roles from selected feeds, save the ones worth checking, then track your next step with each lead.
            </p>
          </div>

          {/* Steps grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '01',
                icon: Search,
                title: 'Search relevant roles',
                body: 'Filter curated remote feeds by role signals, skills, and location text — Nigeria, Africa, worldwide, and more.',
                color: 'bg-[#f0edf8] text-[#6549ad]',
                border: 'border-[#ded7f0]',
              },
              {
                step: '02',
                icon: BookmarkCheck,
                title: 'Save a lead',
                body: 'Keep the role and its source link in your personal opportunity list so nothing slips through the cracks.',
                color: 'bg-[#eaf2e9] text-[#477454]',
                border: 'border-[#d4e8d0]',
              },
              {
                step: '03',
                icon: Send,
                title: 'Track your next step',
                body: 'Update the lead when you apply, add notes, or keep it for later. Your search stays organized without extra effort.',
                color: 'bg-[#fef3e6] text-[#9a6f30]',
                border: 'border-[#f0ddb0]',
              },
            ].map(({ step, icon: Icon, title, body, color, border }) => (
              <div
                key={step}
                className={`group relative overflow-hidden rounded-2xl border ${border} bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(37,46,39,.18)] sm:p-8`}
              >
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 text-6xl font-extrabold leading-none text-[#f0ede8] select-none"
                >
                  {step}
                </span>

                <div className={`relative z-10 grid size-10 place-items-center rounded-xl ${color}`}>
                  <Icon aria-hidden="true" className="size-5" />
                </div>

                <h3 className="relative z-10 mt-4 text-base font-extrabold tracking-tight text-[#253129]">{title}</h3>
                <p className="relative z-10 mt-2 text-sm leading-6 text-[#68736c]">{body}</p>
              </div>
            ))}
          </div>

          {/* Detailed feature panel */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#e6e3dc] bg-white shadow-[0_24px_60px_-44px_rgba(37,46,39,.35)] lg:grid lg:grid-cols-[1.25fr_.75fr]">
            {/* Mock UI side with Clickable JobCard */}
            <div className="border-b border-[#e6e3dc] p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="overflow-hidden rounded-xl border border-[#e8e5de] bg-[#f9f8f5]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eeece7] bg-white px-4 py-3">
                  <div>
                    <p className="text-[0.7rem] font-extrabold uppercase tracking-[.15em] text-[#56615c]">Job discovery</p>
                    <p className="mt-0.5 text-sm font-bold text-[#202c26]">Find a role to explore</p>
                  </div>
                  <span className="rounded-md border border-[#e6e1f0] bg-[#f6f3fb] px-2.5 py-1 text-xs font-bold text-[#573da5]">
                    Interactive Preview
                  </span>
                </div>
                <div className="grid gap-2.5 p-3 sm:grid-cols-[1fr_auto] sm:p-4">
                  <div className="flex min-h-10 items-center gap-2 rounded-lg border border-[#e7e8e2] bg-white px-3">
                    <Search aria-hidden="true" className="size-3.5 shrink-0 text-[#879088]" />
                    <span className="text-xs text-[#69746d]">Role, skill, or company</span>
                  </div>
                  <div className="flex min-h-10 items-center gap-2 rounded-lg border border-[#e7e8e2] bg-white px-3 text-xs font-medium text-[#56615c]">
                    <MapPin aria-hidden="true" className="size-3.5 text-[#6549ad]" />
                    Nigeria, Africa, worldwide
                  </div>
                </div>
                <div className="mx-3 mb-3 sm:mx-4 sm:mb-4">
                  <JobCard
                    job={allCuratedJobs[4]}
                    initiallySaved={savedJobIds.has(allCuratedJobs[4].id)}
                    onSaveToggle={handleSaveToggle}
                    onClick={(job) => setSelectedJob(job)}
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-xs leading-4 text-[#8a938d]">
                Click anywhere on the card to preview full requirements
              </p>
            </div>

            {/* Feature list side */}
            <div className="flex flex-col justify-center gap-0 p-6 sm:p-8">
              {[
                {
                  icon: Search,
                  color: 'bg-[#f0edf8] text-[#6549ad]',
                  title: 'Search relevant roles',
                  body: 'Filter selected feeds by role signals, skills, and location text.',
                  border: true,
                },
                {
                  icon: BookmarkCheck,
                  color: 'bg-[#f0edf8] text-[#6549ad]',
                  title: 'Save a lead',
                  body: 'Keep the role and its source link in your personal opportunity list.',
                  border: true,
                },
                {
                  icon: Send,
                  color: 'bg-[#eaf2e9] text-[#477454]',
                  title: 'Track your next step',
                  body: 'Update the lead when you apply, or keep it for later.',
                  border: false,
                },
              ].map(({ icon: Icon, color, title, body, border }) => (
                <div key={title} className={`flex gap-4 ${border ? 'border-b border-[#e8e6df] pb-6 mb-6' : ''}`}>
                  <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${color}`}>
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#253129]">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#68736c]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRANSPARENCY / FAQ
      ══════════════════════════════════════ */}
      <section id="transparency" className="border-t border-[#e8e6df] bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 lg:px-12 lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#6549ad]">Clear expectations</p>
            <h2 className="mt-3 max-w-md text-3xl font-extrabold leading-tight tracking-[-0.045em] text-[#1c2922] sm:text-4xl">
              Useful tools, without pretending every listing is perfect.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#637067]">
              We believe a good tool earns trust by being honest about what it can and can&rsquo;t do.
            </p>
          </div>

          <div className="divide-y divide-[#e8e6df]">
            {[
              {
                question: 'Does a Nigeria filter mean the employer accepts applications from Nigeria?',
                answer:
                  "No. It matches location text such as 'Nigeria', 'Africa', or 'worldwide' in the listing. Always confirm country eligibility and work-authorization requirements on the employer's original listing before applying.",
              },
              {
                question: 'Are the posting dates guaranteed to be current?',
                answer:
                  'Dates are shown when a source provides a valid posting date. Feeds can lag and roles can close, so check the original listing before applying.',
              },
              {
                question: 'Is this a directory of every job in Nigeria?',
                answer:
                  'No. The current product focuses on remote roles from selected feeds. Local, on-site, freelance, and contract opportunities are not comprehensively covered.',
              },
              {
                question: 'What data do you store about me?',
                answer:
                  'We store your account credentials and the leads and notes you save in your workspace. We do not sell your data or share it with third parties.',
              },
            ].map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#1e1830] text-white sm:rounded-[2.5rem]">
          {/* Layered background decorations */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#2d2050] via-[#1e1830] to-[#171328]" />
          <div aria-hidden="true" className="absolute -right-24 -top-40 size-80 rounded-full border border-white/[0.07] sm:-right-10 sm:-top-52 sm:size-[32rem]" />
          <div aria-hidden="true" className="absolute -right-8 -top-20 size-48 rounded-full border border-white/[0.04] sm:size-72" />
          <div aria-hidden="true" className="absolute right-28 top-16 size-40 rounded-full bg-[#826bc0]/15 blur-3xl sm:size-64" />
          <div aria-hidden="true" className="absolute left-1/4 bottom-0 size-48 rounded-full bg-[#5a8c5e]/10 blur-3xl" />

          <div className="relative px-8 py-14 sm:px-14 sm:py-18 lg:px-20 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#c8b9f0]">Your search deserves a system</p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                Make your next application<br className="hidden sm:block" /> a little more intentional.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                Create a personal workspace for discovering roles, saving the best leads, and keeping track of every step in your search.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/login?mode=sign-up"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-[#2d1f5e] shadow-[0_8px_24px_-8px_rgba(0,0,0,.5)] transition-all hover:-translate-y-0.5 hover:bg-[#f1edf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Start your search <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-xl px-7 text-sm font-bold text-white/80 ring-1 ring-white/20 transition-all hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="border-t border-[#e8e6df] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            {/* Brand */}
            <div className="flex flex-col gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <Image
                  src="/gigshqicon.png"
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-lg transition-transform group-hover:scale-105"
                />
                <span className="text-base font-extrabold tracking-tight text-[#18231f]">
                  gigs<span className="text-[#573da5]">hq</span>
                </span>
              </Link>
              <p className="max-w-xs text-xs leading-5 text-[#8a938d]">
                Built to help remote job seekers in Africa search, organize, and follow through. Listings always link to their original sources.
              </p>
            </div>

            {/* Nav links */}
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#8a938d]">Product</p>
                <a href="#latest-jobs" className="font-semibold text-[#56615c] transition-colors hover:text-[#573da5]">Latest jobs</a>
                <a href="#how-it-works" className="font-semibold text-[#56615c] transition-colors hover:text-[#573da5]">How it works</a>
                <a href="#transparency" className="font-semibold text-[#56615c] transition-colors hover:text-[#573da5]">Transparency</a>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#8a938d]">Account</p>
                <Link href="/login" className="font-semibold text-[#56615c] transition-colors hover:text-[#573da5]">Sign in</Link>
                <Link href="/login?mode=sign-up" className="font-semibold text-[#573da5] transition-colors hover:text-[#463087]">Get started →</Link>
              </div>
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-[#e8e6df] pt-6 text-xs text-[#8a938d] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} GigsHQ. All rights reserved.</p>
            <p>Remote job search, organized.</p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════
          INTERACTIVE JOB DETAIL MODAL
      ══════════════════════════════════════ */}
      <JobDetailModal
        job={selectedJob}
        isOpen={selectedJob !== null}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobIds.has(selectedJob.id) : false}
        onToggleSave={handleSaveToggle}
      />

      {/* ══════════════════════════════════════
          LIVE TOAST / NOTIFICATION BANNER
      ══════════════════════════════════════ */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 rounded-full border border-violet-200 bg-white/95 px-5 py-3 text-xs font-bold text-slate-800 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="size-4 text-[#573da5]" />
          <span>{toastMessage}</span>
          <Link
            href="/login?mode=sign-up"
            className="ml-2 rounded-full bg-[#573da5] px-3 py-1 text-white hover:bg-[#463087]"
          >
            Sign up to sync
          </Link>
          <button
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss notification"
            className="ml-1 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
