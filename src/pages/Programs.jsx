import { usePrograms } from '../hooks/usePrograms'

const programTypeLabels = {
  webinar: 'Webinar',
  workshop: 'Workshop',
  class: 'Kelas',
  program: 'Program',
}

const programStatusLabels = {
  upcoming: 'Pendaftaran akan dibuka',
  closed: 'Pendaftaran ditutup',
  completed: 'Program telah selesai',
}

function formatProgramDate(value) {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function formatProgramDates(startDate, endDate) {
  const start = formatProgramDate(startDate)
  const end = formatProgramDate(endDate)

  if (start && end && start !== end) {
    return `${start} – ${end}`
  }

  if (start) {
    return start
  }

  return end ? `Hingga ${end}` : null
}

function ProgramCTA({ program }) {
  if (program.programStatus === 'open' && program.registrationURL) {
    return (
      <a
        href={program.registrationURL}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary mt-6 inline-flex h-10 px-4"
      >
        Daftar Sekarang
      </a>
    )
  }

  if (program.programStatus === 'open') {
    return <p className="mt-6 text-sm text-slate-500">Pendaftaran belum tersedia.</p>
  }

  if (program.programStatus && programStatusLabels[program.programStatus]) {
    return <p className="mt-6 text-sm text-slate-500">{programStatusLabels[program.programStatus]}</p>
  }

  return null
}

function ProgramCard({ program }) {
  const dates = formatProgramDates(program.startDate, program.endDate)
  const location = [program.locationType, program.locationText].filter(Boolean).join(' · ')

  return (
    <div className={`card overflow-hidden ${program.featured ? 'ring-2 ring-brand-500' : ''}`}>
      {program.image ? (
        <img
          src={program.image}
          alt={program.imageAlt}
          className="aspect-[16/9] w-full object-cover"
        />
      ) : null}
      <div className="card-body">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
          {program.programType ? <span>{programTypeLabels[program.programType] || program.programType}</span> : null}
          {program.featured ? <span className="text-brand-600">Pilihan</span> : null}
        </div>
        <p className="mt-2 break-words text-slate-900 font-semibold">{program.title}</p>
        <p className="mt-1 text-sm text-slate-600">{program.shortDescription}</p>
        {program.description ? <p className="mt-3 text-sm leading-6 text-slate-600">{program.description}</p> : null}
        {dates ? <p className="mt-4 text-sm text-slate-600">{dates}</p> : null}
        {location ? <p className="mt-1 text-sm text-slate-600">{location}</p> : null}
        {program.price ? <p className="mt-4 text-2xl font-bold text-slate-900">{program.price}</p> : null}
        {program.topics.length > 0 ? (
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {program.topics.map((topic) => <li key={topic}>• {topic}</li>)}
          </ul>
        ) : null}
        {program.outcomes.length > 0 ? (
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {program.outcomes.map((outcome) => <li key={outcome}>• {outcome}</li>)}
          </ul>
        ) : null}
        <ProgramCTA program={program} />
      </div>
    </div>
  )
}

export default function Programs() {
  const { programs, hasError } = usePrograms()

  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Program</h1>
        <p className="mt-3 max-w-prose text-slate-600">
          Temukan webinar, workshop, kelas, dan program yang tersedia dari Relung Jiwa.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs === null ? (
            Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="card animate-pulse" aria-hidden="true">
                <div className="card-body space-y-3">
                  <div className="h-5 w-3/5 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-4/5 rounded bg-slate-100" />
                </div>
              </div>
            ))
          ) : hasError ? (
            <p className="text-sm text-slate-600">Program belum dapat dimuat saat ini.</p>
          ) : programs.length === 0 ? (
            <p className="text-sm text-slate-600">Belum ada program yang tersedia.</p>
          ) : (
            programs.map((program) => <ProgramCard key={program.id} program={program} />)
          )}
        </div>
      </div>
    </section>
  )
}