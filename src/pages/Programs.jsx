import { useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'

import CmsTestimonialSection from '../components/CmsTestimonialSection'
import { usePrograms } from '../hooks/usePrograms'

const programTypeLabels = { webinar: 'Webinar', workshop: 'Workshop', class: 'Kelas', program: 'Program' }
const programStatusLabels = { open: 'Pendaftaran dibuka', upcoming: 'Pendaftaran akan dibuka', closed: 'Pendaftaran ditutup', completed: 'Program telah selesai' }
const filters = [{ value: 'all', label: 'Semua' }, { value: 'open', label: 'Pendaftaran dibuka' }, { value: 'upcoming', label: 'Akan datang' }, { value: 'closed', label: 'Selesai / ditutup' }]
const fallbackImages = ['/assets/editorial/garden-sanctuary.jpg', '/assets/editorial/studio-reflective.jpg']
const statusStyles = { open: 'bg-coral text-white', upcoming: 'bg-soft-blue text-cocoa', closed: 'bg-surface-container text-cocoa', completed: 'bg-surface-container text-cocoa' }

function formatProgramDate(value) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date)
}

function formatProgramDates(startDate, endDate) {
  const start = formatProgramDate(startDate)
  const end = formatProgramDate(endDate)
  if (start && end && start !== end) return `${start} – ${end}`
  if (start) return start
  return end ? `Hingga ${end}` : null
}

function ProgramCTA({ program }) {
  if (program.programStatus === 'open' && program.registrationURL) return <a href={program.registrationURL} target="_blank" rel="noreferrer" className="btn btn-coral mt-6 w-full sm:w-auto">Daftar Sekarang <ArrowRight size={16} aria-hidden="true" /></a>
  if (program.programStatus === 'open') return <p className="mt-6 text-sm text-espresso/55">Pendaftaran belum tersedia.</p>
  return program.programStatus ? <p className="mt-6 text-sm font-medium text-cocoa">{programStatusLabels[program.programStatus] || program.programStatus}</p> : null
}

function ProgramMetadata({ program }) {
  const dates = formatProgramDates(program.startDate, program.endDate)
  const location = [program.locationType, program.locationText].filter(Boolean).join(' · ')
  return <div className="space-y-3 text-sm leading-6 text-espresso/65">{dates ? <p className="flex gap-2"><CalendarDays className="mt-0.5 shrink-0 text-cocoa" size={16} aria-hidden="true" />{dates}</p> : null}{location ? <p className="flex gap-2"><MapPin className="mt-0.5 shrink-0 text-cocoa" size={16} aria-hidden="true" />{location}</p> : null}{program.price ? <p className="pt-1 font-serif text-2xl text-espresso">{program.price}</p> : null}</div>
}

function FeaturedProgram({ program }) {
  return <article className="overflow-hidden rounded-xl bg-surface-container-low"><div className="grid lg:grid-cols-[7fr_5fr]"><div className="order-2 flex flex-col justify-center p-6 sm:p-10 lg:order-1 lg:p-12"><p className="eyebrow">Pilihan saat ini</p><div className="mt-5 flex flex-wrap items-center gap-2"><span className="text-xs font-semibold uppercase tracking-[.16em] text-cocoa">{programTypeLabels[program.programType] || program.programType || 'Program'}</span>{program.programStatus ? <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[program.programStatus] || 'bg-surface text-cocoa'}`}>{programStatusLabels[program.programStatus] || program.programStatus}</span> : null}</div><h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-espresso sm:text-5xl">{program.title}</h2><p className="mt-5 max-w-xl text-base leading-8 text-espresso/75 sm:text-lg">{program.shortDescription}</p>{program.description ? <p className="mt-5 max-w-xl border-l border-cocoa/20 pl-5 text-sm leading-7 text-espresso/65">{program.description}</p> : null}{program.topics.length > 0 ? <div className="mt-6 flex flex-wrap gap-2">{program.topics.slice(0, 4).map((topic) => <span key={topic} className="rounded-full border border-cocoa/15 bg-surface px-3 py-1.5 text-xs font-medium text-cocoa">{topic}</span>)}</div> : null}<ProgramCTA program={program} /></div><img src={program.image || fallbackImages[0]} alt={program.imageAlt || program.title} className="order-1 aspect-[4/3] h-full w-full object-cover lg:order-2 lg:aspect-auto lg:min-h-[560px]" /></div></article>
}

function ProgramRow({ program, index }) {
  const number = String(index + 1).padStart(2, '0')
  const status = program.programStatus
  return <article className={`grid gap-6 border-t border-cocoa/15 py-8 lg:grid-cols-[3fr_6fr_3fr] lg:gap-10 ${['closed', 'completed'].includes(status) ? 'opacity-75' : ''}`}>
    <div><span className="font-serif text-3xl text-coral">{number}</span><p className="mt-4 max-w-[13rem] font-serif text-xl leading-snug text-espresso">{formatProgramDates(program.startDate, program.endDate) || 'Tanggal akan diumumkan'}</p></div>
    <div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold uppercase tracking-[.16em] text-cocoa">{programTypeLabels[program.programType] || program.programType || 'Program'}</span>{status ? <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[status] || 'bg-surface-container text-cocoa'}`}>{programStatusLabels[status] || status}</span> : null}</div><h3 className="mt-4 font-serif text-3xl leading-tight text-espresso">{program.title}</h3><p className="mt-4 max-w-2xl leading-7 text-espresso/70">{program.shortDescription}</p>{program.description ? <p className="mt-4 text-sm leading-6 text-espresso/60">{program.description}</p> : null}</div>
    <div className="flex gap-5 lg:block"><img src={program.image || fallbackImages[index % fallbackImages.length]} alt={program.imageAlt || program.title} className="h-24 w-24 shrink-0 rounded-lg object-cover lg:mb-6 lg:h-36 lg:w-full" /><div className="min-w-0"><ProgramMetadata program={program} /><ProgramCTA program={program} /></div></div>
  </article>
}

export default function Programs() {
  const { programs, hasError } = usePrograms()
  const [filter, setFilter] = useState('all')
  const featuredProgram = useMemo(() => programs?.find((program) => program.featured) || null, [programs])
  const visiblePrograms = useMemo(() => (programs || []).filter((program) => program.id !== featuredProgram?.id && (filter === 'all' || (filter === 'closed' ? ['closed', 'completed'].includes(program.programStatus) : program.programStatus === filter))), [filter, featuredProgram, programs])

  return <>
    <section className="section pb-12 pt-8 sm:pt-12"><div className="container-max grid gap-10 lg:grid-cols-[8fr_4fr] lg:items-end"><div><p className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-cocoa/50" />Ruang belajar bersama</p><h1 className="page-title mt-5 max-w-3xl">Program</h1></div><p className="max-w-md border-l border-cocoa/20 pl-5 text-base leading-8 text-espresso/70">Temukan webinar, workshop, kelas, dan program yang tersedia dari Relung Jiwa.</p></div></section>
    {featuredProgram ? <section className="pb-12"><div className="container-max"><FeaturedProgram program={featuredProgram} /></div></section> : null}
    <section className="section bg-surface-container-low pt-12"><div className="container-max"><div className="flex flex-col gap-6 border-b border-cocoa/15 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Kalender program</p><h2 className="section-title mt-3">Temukan ritme yang sesuai untukmu.</h2></div><div className="flex max-w-full gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter program">{filters.map((item) => <button key={item.value} type="button" onClick={() => setFilter(item.value)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa ${filter === item.value ? 'bg-cocoa text-cream' : 'bg-surface text-cocoa hover:bg-surface-container'}`}>{item.label}</button>)}</div></div><div className="mt-2" aria-busy={programs === null}>{programs === null ? Array.from({ length: 3 }, (_, index) => <div key={index} className="h-64 animate-pulse border-t border-cocoa/15 bg-surface-container" aria-hidden="true" />) : hasError ? <p className="py-8 text-espresso/65">Program belum dapat dimuat saat ini.</p> : visiblePrograms.length === 0 ? <p className="py-8 text-espresso/65">Belum ada program pada kategori ini.</p> : visiblePrograms.map((program, index) => <ProgramRow key={program.id} program={program} index={index} />)}</div></div></section>
    <CmsTestimonialSection />
  </>
}
