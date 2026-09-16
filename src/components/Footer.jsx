import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useFooter } from '../hooks/useFooter'
import { useSiteSettings } from '../hooks/useSiteSettings'

const socialIcons = {
  instagram: FaInstagram,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
}

function FooterLink({ link }) {
  const className = 'block text-cream/75 hover:text-white'

  if (link.type === 'internal') {
    return <Link to={link.path} className={className}>{link.label}</Link>
  }

  return (
    <a href={link.url} className={className} target={link.openInNewTab ? '_blank' : undefined} rel={link.openInNewTab ? 'noreferrer' : undefined}>
      {link.label}
    </a>
  )
}

function formatCopyright(copyrightText) {
  return copyrightText.replaceAll('{year}', String(new Date().getFullYear()))
}

export default function Footer() {
  const footer = useFooter()
  const settings = useSiteSettings()
  const socialLinks = footer.showSocialLinks
    ? Object.entries(settings.social).filter(([, url]) => Boolean(url))
    : []

  return (
    <footer className="bg-espresso text-cream">
      <div className="container-max grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src="/assets/brand/relung-jiwa-landscape.png" alt={settings.siteName} width="186" height="48" className="h-10 w-auto" />
          {settings.shortDescription ? <p className="mt-5 max-w-sm leading-7 text-cream/70">{settings.shortDescription}</p> : null}
        </div>
        {footer.linkGroups.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold uppercase tracking-[.16em] text-sky-blue">{group.title}</p>
            <div className="mt-4 flex flex-col gap-2.5 text-cream/75">
              {group.links.map((link) => <FooterLink key={link.label} link={link} />)}
            </div>
          </div>
        ))}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[.16em] text-sky-blue">Terhubung</p>
          {settings.whatsapp.url && settings.whatsapp.number ? (
            <a className="mt-4 block text-cream/75 hover:text-white" href={settings.whatsapp.url} target="_blank" rel="noreferrer">{settings.whatsapp.number}</a>
          ) : null}
          {settings.email ? <a className="mt-2 block text-cream/75 hover:text-white" href={'mailto:' + settings.email}>{settings.email}</a> : null}
          {socialLinks.length ? (
            <div className="mt-4 flex items-center gap-4 text-cream/75">
              {socialLinks.map(([name, url]) => {
                const Icon = socialIcons[name]
                return Icon ? <a key={name} href={url} target="_blank" rel="noreferrer" className="hover:text-white" aria-label={name}><Icon aria-hidden="true" /></a> : null
              })}
            </div>
          ) : null}
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="container-max py-5 text-sm text-cream/55">{formatCopyright(footer.copyrightText)}</div>
      </div>
    </footer>
  )
}
