'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ArrowUpRight, BriefcaseBusiness, Check, CircleHelp, Copy, Filter, FolderKanban,
  Mail, Menu, MoreHorizontal, PenLine, Plus, Search, Settings2, Target, UserRound, X,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const leads = [
  { company: 'Linear', title: 'Senior Full-Stack Engineer', contact: 'Ari Lewis', email: 'ari@linear.app', rate: '$120–150/hr', score: 96, tags: ['Next.js', 'Supabase'], source: 'Curated', color: 'bg-violet-600' },
  { company: 'Loops', title: 'Email & Lifecycle Designer', contact: 'Maya Chen', email: 'maya@loops.so', rate: '$4,000–6,000/mo', score: 93, tags: ['Email Design', 'Figma'], source: 'LinkedIn', color: 'bg-emerald-500' },
  { company: 'Arcade', title: 'Content Strategist + UGC Creator', contact: 'Tom Wu', email: 'tom@arcade.ai', rate: '$90–110/hr', score: 91, tags: ['Content', 'AI / UGC'], source: 'Contra', color: 'bg-orange-500' },
  { company: 'Framer', title: 'WordPress to Next.js Developer', contact: 'Noah Patel', email: 'noah@framer.com', rate: '$7,000 project', score: 89, tags: ['WordPress', 'Next.js'], source: 'Upwork', color: 'bg-blue-500' },
  { company: 'Vercel', title: 'Product Marketing Designer', contact: 'Sam Rivera', email: 'sam@vercel.com', rate: '$100–130/hr', score: 87, tags: ['Figma', 'Copywriting'], source: 'Referral', color: 'bg-slate-900' },
  { company: 'Webflow', title: 'Full-Stack Growth Partner', contact: 'Jules Martin', email: 'jules@webflow.com', rate: '$8,500 project', score: 84, tags: ['Growth', 'Shopify'], source: 'Wellfound', color: 'bg-pink-500' },
]

const outreach = [
  { company: 'Notion', email: 'alex@notion.so', type: 'Cold Email', date: 'Oct 14, 2026', status: 'Replied' },
  { company: 'Framer', email: 'noah@framer.com', type: 'Portfolio Pitch', date: 'Oct 12, 2026', status: 'Interested' },
  { company: 'Loops', email: 'maya@loops.so', type: 'Cold Email', date: 'Oct 11, 2026', status: 'Opened' },
  { company: 'Arcade', email: 'tom@arcade.ai', type: 'UGC / Content', date: 'Oct 09, 2026', status: 'Sent' },
]

const nav = [
  { label: 'Opportunities & Leads', icon: Target, key: 'opportunities' },
  { label: 'Campaigns & Ingestion', icon: FolderKanban, key: 'campaigns' },
  { label: 'AI Pitch Generator', icon: PenLine, key: 'pitch' },
  { label: 'Email Outbound Tracker', icon: Mail, key: 'outbound' },
  { label: 'Settings / Profile Context', icon: Settings2, key: 'settings' },
]

function StatusBadge({ status }: { status: string }) {
  const tone = status === 'Interested' || status === 'Replied' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : status === 'Opened' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-slate-50 text-slate-600'
  return <Badge variant="outline" className={tone}><span className="mr-1.5 size-1.5 rounded-full bg-current" />{status}</Badge>
}

function Sidebar({ active, setActive }: { active: string; setActive: (key: string) => void }) {
  return <aside className="hidden w-[264px] shrink-0 flex-col border-r border-slate-200 bg-white px-5 py-6 text-slate-900 lg:flex">
    <div className="flex items-center gap-3 px-2"><div className="flex size-10 items-center justify-center rounded-xl bg-violet-50"><Image src="/gigshqicon.png" alt="" width={40} height={40} className="size-10 rounded-xl object-contain" /></div><span className="text-xl font-semibold tracking-tight">gigs<span className="text-violet-700">hq</span></span></div>
    <p className="mb-3 mt-10 px-3 text-[11px] font-semibold uppercase tracking-[.12em] text-slate-400">Your workspace</p>
    <nav aria-label="Main navigation" className="flex flex-col gap-1">{nav.map(({ label, icon: Icon, key }) => <button key={key} type="button" aria-current={active === key ? 'page' : undefined} onClick={() => setActive(key)} className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-sm transition-colors ${active === key ? 'bg-violet-50 font-semibold text-violet-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><Icon aria-hidden="true" className="size-[18px]" />{label}</button>)}</nav>
    <div className="mt-auto rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="mb-3 flex items-center gap-2"><UserRound aria-hidden="true" className="size-4 text-violet-700" /><span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Personal profile</span></div><p className="text-sm font-semibold text-slate-800">Developer & creator</p><p className="mt-1 text-xs leading-5 text-slate-500">Full-stack engineer, designer & content strategist</p><a href="https://jdev-vercel.app" className="mt-4 inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-violet-800 hover:text-violet-950">View portfolio <ArrowUpRight aria-hidden="true" className="size-3.5" /></a></div>
    <p className="mt-5 px-3 text-[11px] text-slate-400">Personal workspace</p>
  </aside>
}

function Header({ active, menuOpen, setMenuOpen }: { active: string; menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const title = nav.find((item) => item.key === active)?.label ?? 'Opportunities & Leads'
  return <header className="flex min-h-[88px] items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 sm:px-8"><div className="min-w-0"><p className="text-xs font-medium text-slate-500">Personal job-search workspace</p><h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">{title}</h1></div><div className="flex shrink-0 items-center gap-2"><div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600"><UserRound aria-hidden="true" className="size-4 text-violet-700" /><span className="hidden sm:inline">For you</span></div><Button type="button" variant="outline" size="icon" className="lg:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}</Button></div></header>
}

function MobileNavigation({ active, menuOpen, setActive, setMenuOpen }: { active: string; menuOpen: boolean; setActive: (key: string) => void; setMenuOpen: (open: boolean) => void }) {
  return <nav id="mobile-navigation" aria-label="Main navigation" className={`${menuOpen ? 'block' : 'hidden'} border-b border-slate-200 bg-white px-4 py-2 lg:hidden`}>
    <div className="flex flex-col gap-1">
      {nav.map(({ label, icon: Icon, key }) => <button key={key} type="button" aria-current={active === key ? 'page' : undefined} onClick={() => { setActive(key); setMenuOpen(false) }} className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors ${active === key ? 'bg-violet-50 text-violet-900' : 'text-slate-600 hover:bg-slate-50'}`}><Icon aria-hidden="true" className="size-[18px]" />{label}</button>)}
    </div>
  </nav>
}

function LeadCard({ lead, onPitch, onSave }: { lead: typeof leads[number]; onPitch: () => void; onSave: () => void }) {
  return <Card className="group overflow-hidden border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"><CardContent className="p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-xs font-medium text-slate-500">{lead.company}</p><h3 className="mt-1 text-[15px] font-semibold leading-5 text-slate-950">{lead.title}</h3></div><Badge variant="outline" className="shrink-0 border-violet-200 bg-violet-50 text-violet-800">{lead.score}% fit</Badge></div><div className="mt-4 flex flex-wrap gap-2">{lead.tags.map(tag => <Badge key={tag} variant="outline" className="border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">{tag}</Badge>)}</div><div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-3 border-t border-slate-100 pt-4"><div className="min-w-0"><p className="text-xs text-slate-500">Contact · {lead.contact}</p><p className="mt-1 truncate text-xs text-slate-600">{lead.email}</p><p className="mt-2 text-[11px] text-slate-400">Sample source: {lead.source}</p></div><p className="text-right text-xs font-semibold text-slate-900">{lead.rate}</p></div><div className="mt-4 flex gap-2 border-t border-slate-100 pt-4"><Button variant="outline" size="sm" className="flex-1" onClick={onPitch}><PenLine aria-hidden="true" data-icon="inline-start" />Prepare pitch</Button><Button variant="outline" size="icon-sm" aria-label="Save sample lead" title="Save sample lead" onClick={onSave}><Plus aria-hidden="true" /></Button><DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More sample lead actions"><MoreHorizontal aria-hidden="true" /></Button>} /><DropdownMenuContent align="end"><DropdownMenuItem><CircleHelp data-icon="inline-start" />View details</DropdownMenuItem><DropdownMenuItem><Mail data-icon="inline-start" />Contact details</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></CardContent></Card>
}

function Opportunities({ setActive, toast }: { setActive: (key: string) => void; toast: (message: string) => void }) {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('all')
  const filtered = useMemo(() => leads.filter(l => `${l.company} ${l.title} ${l.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()) && (role === 'all' || l.title.toLowerCase().includes(role.toLowerCase()))), [query, role])
  return <div className="flex flex-col gap-6">
    <section className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
      <div><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-amber-500" /><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Demo data</p></div><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">These sample roles are here to preview your workflow. They are not live listings, and no job sources are connected yet.</p></div>
      <Button className="w-full sm:w-auto" onClick={() => toast('Job-source ingestion is not connected yet.')}><Plus aria-hidden="true" data-icon="inline-start" />Connect a source</Button>
    </section>
    <section aria-label="Search and filter sample opportunities" className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex min-h-11 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100"><Search aria-hidden="true" className="size-4 shrink-0 text-slate-400" /><span className="sr-only">Search sample opportunities</span><Input value={query} onChange={e => setQuery(e.target.value)} className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" placeholder="Search roles, skills, or companies" /></label>
        <Select value={role} onValueChange={value => setRole(value ?? 'all')}><SelectTrigger aria-label="Filter by role" className="h-11 w-full px-3 sm:w-[210px]"><Filter aria-hidden="true" className="size-4 text-slate-500" /><SelectValue placeholder="All role types" /></SelectTrigger><SelectContent><SelectItem value="all">All role types</SelectItem><SelectItem value="full-stack">Full-stack</SelectItem><SelectItem value="email">Email Designer</SelectItem><SelectItem value="content">Content Strategist</SelectItem><SelectItem value="wordpress">WordPress</SelectItem></SelectContent></Select>
      </div>
    </section>
    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><h2 className="text-base font-semibold text-slate-950">{filtered.length} sample {filtered.length === 1 ? 'opportunity' : 'opportunities'}</h2><p className="mt-1 text-sm text-slate-500">Example matches based on your full-stack and creative profile.</p></div><span className="text-xs text-slate-500">Sorted by sample fit score</span></div>
    {filtered.length > 0 ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map(lead => <LeadCard key={lead.company} lead={lead} onPitch={() => setActive('pitch')} onSave={() => toast('Sample leads are not saved. Connect persistence to keep this lead.')} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"><h3 className="text-sm font-semibold text-slate-900">No sample roles match</h3><p className="mt-1 text-sm text-slate-500">Try a different search or role filter.</p><Button variant="outline" className="mt-4" onClick={() => { setQuery(''); setRole('all') }}>Clear filters</Button></div>}
  </div>
}

function Pitch({ toast }: { toast: (message: string) => void }) {
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const pitchText = `Hello ${company.trim() ? `${company.trim()} hiring team` : 'hiring team'},\n\nI’m a full-stack engineer and designer interested in opportunities where I can contribute across product development and user experience. My experience includes Next.js, Supabase, Figma, email design, and content strategy.\n\n${description.trim() ? `I’m particularly interested in this role because: ${description.trim().slice(0, 400)}\n\n` : ''}You can see selected work at https://jdev-vercel.app. I’d welcome the opportunity to discuss how my experience could support your team.\n\nBest,\nJDev`
  const copy = () => {
    navigator.clipboard.writeText(pitchText)
      .then(() => toast('Draft copied to clipboard. Review and personalize it before sending.'))
      .catch(() => toast('Clipboard access was denied. Select and copy the draft manually.'))
  }
  return <div className="grid gap-6 xl:grid-cols-[.85fr_1.15fr]">
    <Card className="border-slate-200 shadow-sm">
      <CardHeader><CardTitle className="text-base">Prepare an application draft</CardTitle><p className="text-sm leading-6 text-slate-500">Add context to personalize a local draft. No AI provider or email service is connected.</p></CardHeader>
      <CardContent className="flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">Company name<Input value={company} onChange={event => setCompany(event.target.value)} placeholder="Company you’re applying to" /></label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">Role or job details<textarea value={description} onChange={event => setDescription(event.target.value)} className="min-h-36 resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-200" placeholder="What does the role ask for, and why are you interested?" /></label>
      </CardContent>
    </Card>
    <Card className="border-slate-200 shadow-sm">
      <CardHeader><div className="flex items-start justify-between gap-4"><div><CardTitle className="text-base">Application draft</CardTitle><p className="mt-1 text-sm text-slate-500">A starting point to edit before you send.</p></div><Badge variant="outline" className="shrink-0">Local draft</Badge></div></CardHeader>
      <CardContent><pre className="min-h-72 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-5 font-sans text-sm leading-7 text-slate-700">{pitchText}</pre><Button variant="outline" className="mt-4" onClick={copy}><Copy aria-hidden="true" data-icon="inline-start" />Copy draft</Button></CardContent>
    </Card>
  </div>
}

function Outbound() {
  return <div className="flex flex-col gap-6">
    <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5"><p className="text-sm font-semibold text-amber-950">Example data only</p><p className="mt-1 text-sm leading-6 text-amber-900/80">These contacts and statuses are placeholders. gigshq does not send email or track outreach yet.</p></section>
    <Card className="border-slate-200 shadow-sm"><CardHeader><CardTitle className="text-base">Outreach tracker</CardTitle><p className="text-sm text-slate-500">Your application activity will appear here after you add it.</p></CardHeader><CardContent><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Company</TableHead><TableHead>Contact</TableHead><TableHead>Pitch type</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{outreach.map(row => <TableRow key={row.company}><TableCell className="font-medium">{row.company}</TableCell><TableCell className="text-slate-500">{row.email}</TableCell><TableCell><Badge variant="outline" className="font-normal">{row.type}</Badge></TableCell><TableCell className="text-slate-500">{row.date}</TableCell><TableCell><StatusBadge status={row.status} /></TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card>
  </div>
}

function Settings() { return <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]"><Card className="border-slate-200/80 shadow-sm"><CardHeader><CardTitle className="text-base">Developer & Creator Profile</CardTitle></CardHeader><CardContent className="flex flex-col gap-5"><div className="flex items-center gap-4"><Avatar className="size-16"><AvatarFallback className="bg-violet-100 text-lg font-semibold text-violet-700">JD</AvatarFallback></Avatar><div><p className="font-semibold">JDev</p><p className="text-sm text-slate-500">Full-Stack Engineer & Creator</p></div><Button variant="outline" size="sm" className="ml-auto"><PenLine data-icon="inline-start" />Edit</Button></div><Separator /><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Core role</p><p className="mt-2 text-sm text-slate-700">Full-Stack Engineer, UI/UX Designer & Content Strategist</p></div><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Portfolio reference</p><a href="https://jdev-vercel.app" className="mt-2 block text-sm font-medium text-violet-700">jdev-vercel.app</a></div></CardContent></Card><Card className="border-slate-200/80 shadow-sm"><CardHeader><CardTitle className="text-base">Key skills & context</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{['Next.js','Supabase','Email Design','Figma Design','Copywriting','Content Strategy','AI Content & UGC','Web3 / Web2','WordPress','Shopify'].map(skill => <Badge key={skill} variant="outline" className="px-3 py-1.5 font-normal">{skill}</Badge>)}</div><div className="mt-8 rounded-xl bg-slate-50 p-4"><p className="text-sm font-medium text-slate-800">How gigshq uses this context</p><p className="mt-1 text-sm leading-6 text-slate-500">Every match score, pitch variation, and outreach recommendation is tuned to the combination of skills you bring to the table.</p></div></CardContent></Card></div> }

function Placeholder({ title, icon: Icon }: { title: string; icon: typeof BriefcaseBusiness }) { return <Card className="border-slate-200 bg-white shadow-sm"><CardContent className="flex min-h-90 flex-col items-center justify-center px-6 text-center"><div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-violet-800"><Icon aria-hidden="true" className="size-6" /></div><h2 className="text-lg font-semibold text-slate-950">{title}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">This workflow is not connected yet. No sources are being scanned and no campaign data is stored.</p></CardContent></Card> }

export default function Page() {
  const [active, setActive] = useState('opportunities')
  const [menuOpen, setMenuOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const toast = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2800) }
  return <div className="flex min-h-screen bg-[#f6f7fb] text-slate-900"><Sidebar active={active} setActive={setActive} /><div className="flex min-w-0 flex-1 flex-col"><Header active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><MobileNavigation active={active} menuOpen={menuOpen} setActive={setActive} setMenuOpen={setMenuOpen} /><main className="flex-1 overflow-auto px-5 py-7 sm:px-8 lg:px-10"><div className="mx-auto max-w-[1440px]">{active === 'opportunities' && <Opportunities setActive={setActive} toast={toast} />}{active === 'pitch' && <Pitch toast={toast} />}{active === 'outbound' && <Outbound />}{active === 'settings' && <Settings />}{active === 'campaigns' && <Placeholder title="Campaigns & Ingestion" icon={FolderKanban} />}</div></main></div>{notice && <div role="status" className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl"><Check className="size-4 text-emerald-300" />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification"><X className="size-4 text-slate-400" /></button></div>}</div>
}
