import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

import { useHeader } from '../hooks/useHeader'
import { useSiteSettings } from '../hooks/useSiteSettings'

const navLinkClass = (isActive) => `rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa ${isActive ? 'bg-cocoa text-cream' : 'text-espresso/70 hover:text-espresso'}`

function NavigationItem({ item, onClick }) {
  if (item.type === 'internal') {
    return <NavLink to={item.href} end={item.href === '/'} className={({ isActive }) => navLinkClass(isActive)} onClick={onClick}>{item.label}</NavLink>
  }

  return <a href={item.href} target={item.openInNewTab ? '_blank' : undefined} rel={item.openInNewTab ? 'noreferrer' : undefined} className={navLinkClass(false)} onClick={onClick}>{item.label}</a>
}

function PrimaryCTA({ cta, className }) {
  if (!cta) return null
  if (cta.type === 'internal') return <Link to={cta.href} className={className}>{cta.label}</Link>
  return <a href={cta.href} target={cta.openInNewTab ? '_blank' : undefined} rel={cta.openInNewTab ? 'noreferrer' : undefined} className={className}>{cta.label}</a>
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const header = useHeader()
  const settings = useSiteSettings()


  return (
    <header className="w-full px-4 pt-3 sm:px-6">
      <div className={`mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-3 rounded-xl border px-4 transition sm:h-20 sm:gap-4 sm:px-6 ${open ? 'border-cocoa/15 bg-cream/95 shadow-[0_8px_30px_-4px_rgba(41,35,33,.08)] backdrop-blur-xl' : 'border-cocoa/10 bg-cream/80 backdrop-blur-xl'}`}>
        <Link to="/" className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa" aria-label={`${settings.siteName}, beranda`}>
          <img src="/assets/brand/relung-jiwa-landscape.png" alt={settings.siteName} width="186" height="48" className="h-8 w-auto object-contain sm:h-9" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {header.navigationItems.map((item) => <NavigationItem key={item.id} item={item} />)}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <PrimaryCTA cta={header.primaryCTA} className="btn btn-coral hidden min-[380px]:inline-flex min-h-10 max-w-[128px] truncate px-3 py-2 text-xs sm:min-h-11 sm:max-w-none sm:px-5 sm:py-2.5 sm:text-sm" />
          <button type="button" className="grid h-10 w-10 place-items-center rounded-lg text-espresso transition hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa lg:hidden" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        </div>
      </div>
      {open ? (
        <nav className="mx-auto mt-2 w-full max-w-[1200px] rounded-xl border border-cocoa/15 bg-cream/95 px-4 py-4 shadow-[0_8px_30px_-4px_rgba(41,35,33,.08)] backdrop-blur-xl lg:hidden" aria-label="Navigasi seluler">
          <div className="flex flex-col gap-1">
            {header.navigationItems.map((item) => <NavigationItem key={item.id} item={item} onClick={() => setOpen(false)} />)}
            <PrimaryCTA cta={header.primaryCTA} className="btn btn-coral mt-3" />
          </div>
        </nav>
      ) : null}
    </header>
  )
}