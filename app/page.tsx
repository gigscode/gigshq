import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookmarkCheck,
  BriefcaseBusiness,
  Check,
  CircleHelp,
  MapPin,
  Search,
  Send,
} from 'lucide-react'

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#fbfaf7] text-[#18231f]">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="gigshq home" className="flex items-center gap-2.5">
          <Image src="/gigshqicon.png" alt="" width={38} height={38} className="rounded-xl" priority />
          <span className="text-xl font-extrabold tracking-tight">gigs<span className="text-[#573da5]">hq</span></span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-3 sm:gap-7">
          <a href="#how-it-helps" className="hidden text-sm font-semibold text-[#56615c] transition-colors hover:text-[#18231f] sm:inline">How it helps</a>
          <Link href="/login" className="text-sm font-semibold text-[#56615c] transition-colors hover:text-[#18231f]">Sign in</Link>
          <Link href="/login?mode=sign-up" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#573da5] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#463087] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#573da5]">
            Get started <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </nav>
      </header>

      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-8 lg:px-12 lg:pb-32 lg:pt-20">
        <div className="pointer-events-none absolute -left-48 top-10 size-[28rem] rounded-full bg-[#e8e4f5]/55 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#ddd8ec] bg-white/80 px-3.5 py-2 text-xs font-bold tracking-wide text-[#573da5] shadow-sm">
            <span className="size-2 rounded-full bg-[#6aab78]" />
            A job-search workspace for Africa’s remote-work journey
          </div>
          <h1 className="max-w-2xl text-[clamp(3.25rem,7vw,5.7rem)] font-extrabold leading-[.99] tracking-[-.065em] text-[#17231e]">
            Find your next role.<br />
            <span className="text-[#6549ad]">Keep the search moving.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#58635d] sm:text-lg sm:leading-8">
            Discover remote digital opportunities, save the ones worth pursuing, and keep your applications organized in one personal workspace.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/login?mode=sign-up" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#573da5] px-6 text-sm font-bold text-white shadow-[0_10px_24px_-12px_rgba(87,61,165,.8)] transition-all hover:-translate-y-0.5 hover:bg-[#463087] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#573da5]">
              Start your search <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a href="#how-it-helps" className="inline-flex min-h-12 items-center justify-center rounded-lg px-5 text-sm font-bold text-[#38443e] transition-colors hover:bg-white">
              How it works
            </a>
          </div>
          <p className="mt-5 max-w-lg text-xs leading-5 text-[#737c76]">
            Location filters are a starting point, not an eligibility guarantee. Confirm requirements and availability with the employer.
          </p>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[570px] lg:ml-auto">
          <div aria-hidden="true" className="absolute -right-4 -top-6 h-32 w-32 rounded-full border border-[#d5e2d5] sm:-right-8 sm:-top-10 sm:h-44 sm:w-44" />
          <div className="absolute -bottom-5 -left-4 size-24 rounded-full bg-[#e8eee4] sm:-bottom-8 sm:-left-8 sm:size-36" />
          <div className="relative rounded-[1.75rem] border border-[#e6e3dc] bg-white p-3 shadow-[0_28px_70px_-35px_rgba(37,46,39,.38)] sm:rounded-[2rem] sm:p-5">
            <div className="flex items-center justify-between border-b border-[#eeece7] px-2 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#69746d]">Your search, in one place</p>
                <p className="mt-1 text-sm font-bold text-[#202c26]">Opportunity workspace</p>
              </div>
              <span className="rounded-full bg-[#f0edf8] px-3 py-1.5 text-xs font-bold text-[#573da5]">Personal</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 py-4 sm:gap-3">
              {[
                { icon: Search, label: 'Discover', active: true },
                { icon: BookmarkCheck, label: 'Save leads', active: false },
                { icon: BriefcaseBusiness, label: 'Track', active: false },
              ].map(({ icon: Icon, label, active }) => (
                <div key={label} className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-bold sm:gap-2 ${active ? 'border-[#ded7f0] bg-[#f6f3fb] text-[#573da5]' : 'border-[#eeece7] bg-[#fdfdfc] text-[#66716a]'}`}>
                  <Icon aria-hidden="true" className="size-3.5" />{label}
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-[#f6f7f3] p-3.5 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold text-[#29352e]">A focused search</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#56615c]">
                  <MapPin aria-hidden="true" className="size-3" /> Nigeria · Africa · Worldwide
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#e7e8e2] bg-white px-3 py-2.5">
                <Search aria-hidden="true" className="size-3.5 text-[#879088]" />
                <span className="text-xs text-[#69746d]">Role, skill, or company</span>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-[#ebe9e3] p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-[#eaf2e9] px-2.5 py-1 text-xs font-bold text-[#477454]">Web development</span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[.12em] text-[#56615c]">Illustrative card</p>
                  <h2 className="mt-1 text-lg font-extrabold tracking-tight text-[#202c26] sm:text-xl">A role worth a closer look</h2>
                  <p className="mt-1 text-xs text-[#68736c]">Check location and requirements on the original listing.</p>
                </div>
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f1eef8] text-[#6549ad]">
                  <BriefcaseBusiness aria-hidden="true" className="size-5" />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#eeece7] pt-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#56615c]">
                  <Check aria-hidden="true" className="size-3.5 text-[#5f986a]" /> Source date when provided
                </span>
                <span className="rounded-lg border border-[#e6e1f0] px-3 py-2 text-xs font-bold text-[#573da5]">Save lead</span>
              </div>
            </div>
            <p className="px-2 pb-1 pt-3 text-center text-xs leading-4 text-[#56615c]">Illustrative interface. This is not a live job listing.</p>
          </div>
        </div>
      </section>

      <section id="how-it-helps" className="border-y border-[#e9e7e0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#6549ad]">From search to application</p>
              <h2 className="mt-3 max-w-lg text-3xl font-extrabold leading-tight tracking-[-.045em] text-[#1c2922] sm:text-4xl">
                See your job search take shape.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#637067] sm:text-base">
              Find roles from selected feeds, save the ones worth checking, then keep your next step with each lead.
            </p>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-2xl border border-[#e6e3dc] bg-[#fbfaf7] shadow-[0_24px_60px_-44px_rgba(37,46,39,.45)] lg:grid-cols-[1.2fr_.8fr]">
            <div className="border-b border-[#e6e3dc] p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="overflow-hidden rounded-xl border border-[#e8e5de] bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eeece7] px-4 py-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[.14em] text-[#56615c]">Job discovery</p>
                    <p className="mt-0.5 text-sm font-bold text-[#202c26]">Find a role to explore</p>
                  </div>
                  <span className="rounded-md border border-[#e6e1f0] bg-[#f6f3fb] px-2.5 py-1 text-xs font-bold text-[#573da5]">Preview</span>
                </div>
                <div className="grid gap-2.5 p-3 sm:grid-cols-[1fr_auto] sm:p-4">
                  <div className="flex min-h-10 items-center gap-2 rounded-lg border border-[#e7e8e2] px-3">
                    <Search aria-hidden="true" className="size-3.5 shrink-0 text-[#879088]" />
                    <span className="text-xs text-[#69746d]">Role, skill, or company</span>
                  </div>
                  <div className="flex min-h-10 items-center gap-2 rounded-lg border border-[#e7e8e2] px-3 text-xs font-medium text-[#56615c]">
                    <MapPin aria-hidden="true" className="size-3.5 text-[#6549ad]" />
                    Nigeria, Africa, worldwide
                  </div>
                </div>
                <div className="mx-3 mb-3 rounded-lg border border-[#ebe9e3] p-4 sm:mx-4 sm:mb-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#56615c]">Illustrative listing, not live</p>
                      <h3 className="mt-1 text-base font-extrabold tracking-tight text-[#202c26]">Frontend Developer</h3>
                      <p className="mt-1 text-xs text-[#68736c]">Example role · Remote location to verify</p>
                    </div>
                    <span className="rounded-full bg-[#eaf2e9] px-2.5 py-1 text-xs font-bold text-[#477454]">Web development</span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#eeece7] pt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#56615c]">
                      <Check aria-hidden="true" className="size-3.5 text-[#5f986a]" />Check original listing
                    </span>
                    <span className="inline-flex min-h-8 items-center gap-1.5 rounded-md border border-[#e6e1f0] px-2.5 text-xs font-bold text-[#573da5]">
                      <BookmarkCheck aria-hidden="true" className="size-3.5" />Save lead
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs leading-4 text-[#56615c]">Illustrative interface. This is not a live feed or real job.</p>
            </div>

            <div className="flex flex-col justify-center gap-0 p-5 sm:p-7">
              <div className="flex gap-4 border-b border-[#e8e6df] pb-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f0edf8] text-[#6549ad]"><Search aria-hidden="true" className="size-4" /></span>
                <div>
                  <h3 className="text-sm font-extrabold text-[#253129]">Search relevant roles</h3>
                  <p className="mt-1 text-sm leading-6 text-[#68736c]">Filter selected feeds by role signals, skills, and location text.</p>
                </div>
              </div>
              <div className="flex gap-4 border-b border-[#e8e6df] py-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f0edf8] text-[#6549ad]"><BookmarkCheck aria-hidden="true" className="size-4" /></span>
                <div>
                  <h3 className="text-sm font-extrabold text-[#253129]">Save a lead</h3>
                  <p className="mt-1 text-sm leading-6 text-[#68736c]">Keep the role and its source link in your personal opportunity list.</p>
                </div>
              </div>
              <div className="flex gap-4 pt-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#eaf2e9] text-[#477454]"><Send aria-hidden="true" className="size-4" /></span>
                <div>
                  <h3 className="text-sm font-extrabold text-[#253129]">Track your next step</h3>
                  <p className="mt-1 text-sm leading-6 text-[#68736c]">Update the lead when you apply, or keep it for later.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 lg:px-12">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#6549ad]">Clear expectations</p>
          <h2 className="mt-3 max-w-md text-3xl font-extrabold leading-tight tracking-[-.045em] text-[#1c2922] sm:text-4xl">Useful tools, without pretending every listing is perfect.</h2>
        </div>
        <div className="divide-y divide-[#e8e6df] border-y border-[#e8e6df]">
          <div className="flex gap-4 py-5">
            <CircleHelp aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#6549ad]" />
            <div>
              <h3 className="text-sm font-bold text-[#253129]">Does a Nigeria filter mean the employer accepts applications from Nigeria?</h3>
              <p className="mt-2 text-sm leading-6 text-[#68736c]">No. It matches location text such as Nigeria, Africa, or worldwide. Confirm country eligibility and work authorization on the employer’s listing.</p>
            </div>
          </div>
          <div className="flex gap-4 py-5">
            <CircleHelp aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#6549ad]" />
            <div>
              <h3 className="text-sm font-bold text-[#253129]">Are the posting dates guaranteed to be current?</h3>
              <p className="mt-2 text-sm leading-6 text-[#68736c]">Dates are shown when a source provides a valid posting date. Feeds can lag and roles can close, so check the original listing before applying.</p>
            </div>
          </div>
          <div className="flex gap-4 py-5">
            <CircleHelp aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#6549ad]" />
            <div>
              <h3 className="text-sm font-bold text-[#253129]">Is this a directory of every job in Nigeria?</h3>
              <p className="mt-2 text-sm leading-6 text-[#68736c]">No. The current product focuses on remote roles from selected feeds. Local, on-site, freelance, and contract opportunities are not comprehensively covered.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-[#25213a] px-6 py-10 text-white sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-16">
          <div aria-hidden="true" className="absolute -right-16 -top-28 size-72 rounded-full border border-white/10 sm:-right-8 sm:-top-44 sm:size-[28rem]" />
          <div aria-hidden="true" className="absolute -right-2 top-12 size-28 rounded-full bg-[#826bc0]/20 blur-2xl sm:right-28 sm:top-20 sm:size-48" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#c8b9f0]">Your search deserves a system</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-.045em] sm:text-4xl">Make the next application a little more intentional.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">Create a personal workspace for discovering roles and keeping track of the ones you pursue.</p>
            <Link href="/login?mode=sign-up" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-[#35265f] transition-colors hover:bg-[#f1edf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Start your search <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e8e6df] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-[#758078] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-2 font-bold text-[#344139]">
            <Image src="/gigshqicon.png" alt="" width={24} height={24} className="rounded-md" />
            gigshq
          </Link>
          <p>Built to help you search, organize, and follow through. Listings link to their original sources.</p>
          <Link href="/login" className="font-semibold text-[#573da5] hover:underline">Sign in</Link>
        </div>
      </footer>
    </main>
  )
}
