import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

import { useHeader } from '../hooks/useHeader'
import { useSiteSettings } from '../hooks/useSiteSettings'

function NavigationItem({ item, className, onClick }) {
  if (item.type === 'internal') {
    return <NavLink to={item.href} end={item.href === '/'} className={className} onClick={onClick}>{item.label}</NavLink>
  }

  return <a href={item.href} target={item.openInNewTab ? '_blank' : undefined} rel={item.openInNewTab ? 'noreferrer' : undefined} className={className} onClick={onClick}>{item.label}</a>
}

function PrimaryCTA({ cta, className }) {
  if (!cta) return null
  if (cta.type === 'internal') return <Link to={cta.href} className={className}>{cta.label}</Link>
  return <a href={cta.href} target={cta.openInNewTab ? '_blank' : undefined} rel={cta.openInNewTab ? 'noreferrer' : undefined} className={className}>{cta.label}</a>
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const header = useHeader()
  const settings = useSiteSettings()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = ({ isActive }) => `text-sm font-medium transition-colors hover:text-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${isActive ? 'text-coral' : 'text-espresso/75'}`

  return <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || open ? 'border-b border-cocoa/10 bg-cream/95 shadow-sm backdrop-blur' : 'bg-cream/80 backdrop-blur-sm'}`}><div className="container-max flex h-[76px] items-center justify-between gap-5"><Link to="/" className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral" aria-label={settings.siteName + ', beranda'}><img src="/assets/brand/relung-jiwa-landscape.png" alt={settings.siteName} width="186" height="48" className="h-10 w-auto"/></Link><nav className="hidden items-center gap-5 lg:flex" aria-label="Navigasi utama">{header.navigationItems.map((item) => <NavigationItem key={item.id} item={item} className={navClass}/>)}</nav><PrimaryCTA cta={header.primaryCTA} className="btn btn-coral hidden px-5 py-2.5 text-sm lg:inline-flex"/><button type="button" className="grid h-10 w-10 place-items-center text-espresso focus:outline-none focus-visible:ring-2 focus-visible:ring-coral lg:hidden" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>{open && <nav className="border-t border-cocoa/10 bg-cream px-5 py-5 lg:hidden" aria-label="Navigasi seluler"><div className="container-max flex flex-col gap-4">{header.navigationItems.map((item) => <NavigationItem key={item.id} item={item} className={navClass} onClick={() => setOpen(false)}/>)}<PrimaryCTA cta={header.primaryCTA} className="btn btn-coral mt-2"/></div></nav>}</header>
}
