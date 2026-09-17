import { Activity, Brain, CircleHelp, HeartPulse, Moon, Sparkles, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useServices } from '../hooks/useServices'

const icons = {
  activity: Activity,
  brain: Brain,
  heart: HeartPulse,
  moon: Moon,
  sparkles: Sparkles,
  target: Target,
}

function ServiceCTA({ cta }) {
  if (!cta) {
    return null
  }

  const className = 'mt-4 inline-flex break-words text-sm font-medium text-brand-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'

  if (cta.type === 'internal') {
    return <Link to={cta.path} className={className}>{cta.label}</Link>
  }

  return (
    <a
      href={cta.url}
      className={className}
      target={cta.openInNewTab ? '_blank' : undefined}
      rel={cta.openInNewTab ? 'noreferrer' : undefined}
    >
      {cta.label}
    </a>
  )
}

function ServiceCard({ service }) {
  const Icon = service.iconKey ? icons[service.iconKey.toLowerCase()] || CircleHelp : null

  return (
    <div className="card">
      <div className="card-body">
        {service.image ? (
          <img
            src={service.image}
            alt={service.imageAlt}
            className="mb-4 aspect-video w-full rounded-xl object-cover"
          />
        ) : null}
        <div className="flex items-center gap-2">
          {Icon ? <Icon className="shrink-0 text-brand-700" size={20} aria-hidden="true" /> : null}
          <p className="min-w-0 break-all font-semibold text-slate-900">{service.title}</p>
        </div>
        <p className="mt-1 break-words text-sm text-slate-600">{service.shortDescription}</p>
        {service.description ? <p className="mt-3 break-words text-sm leading-6 text-slate-600">{service.description}</p> : null}
        <ServiceCTA cta={service.cta} />
      </div>
    </div>
  )
}

export default function Services() {
  const services = useServices()

  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Layanan</h1>
        <p className="mt-3 text-slate-600 max-w-prose">
          Setiap layanan dimulai dengan asesmen singkat untuk memetakan kebutuhan Anda. Rencana intervensi
          disesuaikan dengan tujuan personal, dan kami memberi latihan yang mudah diterapkan sehari-hari.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services === null ? (
            Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="card animate-pulse" aria-hidden="true">
                <div className="card-body space-y-3">
                  <div className="h-5 w-3/5 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-4/5 rounded bg-slate-100" />
                </div>
              </div>
            ))
          ) : services.length === 0 ? (
            <p className="text-sm text-slate-600">Belum ada layanan yang tersedia.</p>
          ) : (
            services.map((service) => <ServiceCard key={service.id} service={service} />)
          )}
        </div>
      </div>
    </section>
  )
}