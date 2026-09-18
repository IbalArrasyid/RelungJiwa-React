import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useFooter } from '../hooks/useFooter'
import { useSiteSettings } from '../hooks/useSiteSettings'

const socialIcons = { instagram: FaInstagram, youtube: FaYoutube, tiktok: FaTiktok, linkedin: FaLinkedinIn }

function FooterLink({ link }) {
  const className = 'block text-sm leading-6 text-cream/65 transition hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue'
  if (link.type === 'internal') return <Link to={link.path} className={className}>{link.label}</Link>
  return <a href={link.url} className={className} target={link.openInNewTab ? '_blank' : undefined} rel={link.openInNewTab ? 'noreferrer' : undefined}>{link.label}</a>
}

function formatCopyright(copyrightText) {
  return copyrightText.replaceAll('{year}', String(new Date().getFullYear()))
}

export default function Footer() {
  const footer = useFooter()
  const settings = useSiteSettings()
  const socialLinks = footer.showSocialLinks ? Object.entries(settings.social).filter(([, url]) => Boolean(url)) : []
  const [navigationGroup, ...additionalGroups] = footer.linkGroups

  return (
    <footer className="bg-espresso text-cream">
      <div className="container-max pb-7 pt-12 sm:pb-8 sm:pt-14">
        <div className="grid gap-10 pb-11 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-6">
            <img src="/assets/brand/relung-jiwa-landscape.png" alt={settings.siteName} width="186" height="48" className="h-10 w-auto brightness-0 invert" />
            {settings.shortDescription ? <p className="mt-5 max-w-sm font-serif text-xl italic leading-8 text-cream/75">{settings.shortDescription}</p> : null}
          </div>

          {navigationGroup ? (
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-cream/80">{navigationGroup.title}</p>
              <div className="mt-4 flex flex-col gap-1.5">
                {navigationGroup.links.map((link) => <FooterLink key={link.label} link={link} />)}
              </div>
            </div>
          ) : null}

          <div className="md:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-cream/80">Bantuan &amp; Privasi</p>
            <div className="mt-4 flex flex-col gap-1.5">
              {additionalGroups.flatMap((group) => group.links).map((link) => <FooterLink key={link.label} link={link} />)}
              {settings.email ? <a className="block text-sm leading-6 text-cream/65 transition hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue" href={`mailto:${settings.email}`}>Kontak</a> : null}
              {settings.whatsapp.url ? <a className="block text-sm leading-6 text-cream/65 transition hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue" href={settings.whatsapp.url} target="_blank" rel="noreferrer">Pertanyaan Umum</a> : null}
            </div>
            {socialLinks.length ? (
              <div className="mt-5 flex items-center gap-3 text-cream/65">
                {socialLinks.map(([name, url]) => {
                  const Icon = socialIcons[name]
                  return Icon ? <a key={name} href={url} target="_blank" rel="noreferrer" className="transition hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue" aria-label={name}><Icon aria-hidden="true" /></a> : null
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-lg bg-cream/10 px-5 py-4 text-center sm:px-8">
          <p className="text-xs leading-5 text-cream/75"><strong className="font-semibold text-cream">Penting:</strong> Relung Jiwa bukan layanan gawat darurat medis. Jika Anda berada dalam krisis atau membutuhkan pertolongan mendesak, segera hubungi 119 atau fasilitas kesehatan terdekat.</p>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-cream/15 pt-5 text-xs leading-5 text-cream/55 sm:flex-row sm:items-center sm:justify-between"><span>{formatCopyright(footer.copyrightText)}</span><span>Dibuat dengan kesadaran dan kehangatan.</span></div>
      </div>
    </footer>
  )
}

