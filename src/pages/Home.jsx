import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, HeartHandshake, Leaf, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import CmsTestimonialSection from '../components/CmsTestimonialSection'
import WhatsAppFAB from '../components/WhatsAppFAB'
import { useHomepage } from '../hooks/useHomepage'

const themes = [
  ['01', 'Cerita lama yang belum selesai'],
  ['02', 'Perasaan yang pernah dipendam'],
  ['03', 'Luka yang pernah diabaikan'],
  ['04', 'Pengalaman yang masih tersimpan'],
]
const topics = [
  ['01', 'Unfinished Business', 'Luka masa lalu yang belum selesai'],
  ['02', 'Life Trap', 'Mengenali pola atau kebiasaan yang terus berulang'],
  ['03', 'Mindful Breathing', 'Latihan napas sadar untuk membantu menenangkan pikiran'],
  ['04', 'Menelusuri Luka Masa Lalu', 'Melihat kembali pengalaman dengan kesadaran'],
  ['05', 'Emotional Release', 'Memahami dan melepaskan emosi yang selama ini tertahan'],
]

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay }}>{children}</motion.div>
}

const SectionTitle = ({ eyebrow, children }) => <><p className="eyebrow">{eyebrow}</p><h2 className="section-title mt-4">{children}</h2></>

function HomepageCTA({ cta, className }) {
  if (!cta) return null

  const content = <>{cta.label} <ArrowRight size={18} /></>

  if (cta.type === 'internal') {
    return <Link className={className} to={cta.path}>{content}</Link>
  }

  return <a className={className} href={cta.url} target={cta.openInNewTab ? '_blank' : undefined} rel={cta.openInNewTab ? 'noreferrer' : undefined}>{content}</a>
}

function MultilineText({ value }) {
  return value.split('\n').map((line, index) => <Fragment key={`${line}-${index}`}>{index > 0 && <br />}{line}</Fragment>)
}

export default function Home() {
  const homepage = useHomepage()

  return <>
    <section className="relative overflow-hidden bg-cream pt-32 sm:pt-36"><div className="hero-orb hero-orb-one" aria-hidden="true" /><div className="hero-orb hero-orb-two" aria-hidden="true" /><div className="container-max relative grid min-h-[660px] items-center gap-12 pb-20 lg:grid-cols-[1.05fr_.95fr] lg:pb-24"><Reveal><p className="eyebrow">{homepage.hero.eyebrow}</p><h1 className="display-title mt-5 max-w-3xl text-5xl leading-[.97] sm:text-6xl lg:text-7xl">{homepage.hero.heading} <em>{homepage.hero.highlightedText}</em></h1><p className="mt-6 max-w-xl font-serif text-2xl leading-snug text-cocoa sm:text-3xl">Pulih dari Luka Batin, Temukan Kembali Kedamaian dalam Dirimu</p><p className="mt-6 max-w-lg text-base leading-7 text-espresso/75 sm:text-lg">{homepage.hero.description}</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><HomepageCTA className="btn btn-coral" cta={homepage.hero.primaryCTA} /><a className="btn btn-outline" href="#program">Pelajari Lebih Lanjut</a></div></Reveal><Reveal className="relative mx-auto w-full max-w-md lg:max-w-none" delay={.15}><div className="relative mx-auto aspect-[4/5] max-w-[470px] overflow-hidden rounded-[48%_48%_8%_8%] bg-soft-blue p-3 shadow-[0_22px_55px_rgba(41,35,33,.14)]"><img src={homepage.hero.image || '/assets/img/upload/Folder%20Upload%20All%20Mentor/Foto%20mentor/DSC00490.jpeg'} alt={homepage.hero.imageAlt} className="h-full w-full rounded-[45%_45%_5%_5%] object-cover" /></div><div className="absolute -bottom-5 -left-3 max-w-[210px] bg-white p-5 shadow-lg sm:-left-7"><Leaf className="mb-2 text-sage" size={22} /><p className="font-serif text-lg leading-tight text-espresso">Pelan-pelan, kamu boleh kembali pada dirimu.</p></div></Reveal></div></section>
    <section className="section bg-white"><div className="container-max grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><Reveal><SectionTitle eyebrow={homepage.recognition.eyebrow}><MultilineText value={homepage.recognition.heading} /></SectionTitle></Reveal><Reveal delay={.1}><p className="max-w-xl text-lg leading-8 text-espresso/75">{homepage.recognition.intro}</p></Reveal></div><div className="container-max mt-12 grid border-t border-cocoa/15 sm:grid-cols-2 lg:grid-cols-4">{themes.map(([number], index) => <Reveal key={number} delay={index * .06} className="border-b border-cocoa/15 p-6 sm:border-r lg:last:border-r-0"><span className="font-serif text-3xl text-coral">{number}</span><p className="mt-10 text-lg font-medium leading-snug">{homepage.recognition.items[index]}</p></Reveal>)}</div></section>
    <section className="section bg-soft-blue"><div className="container-max grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center"><Reveal><SectionTitle eyebrow="Sebuah pemahaman lembut">{homepage.insight.heading}</SectionTitle></Reveal><Reveal delay={.1}><p className="text-lg leading-8 text-espresso/75">{homepage.insight.description}</p><div className="mt-8 flex flex-wrap gap-3">{['Emosi', 'Ketakutan', 'Pola hidup'].map((item) => <span key={item} className="rounded-full border border-cocoa/20 bg-cream px-5 py-2.5 text-sm font-medium text-cocoa">{item}</span>)}</div></Reveal></div></section>
    <section id="program" className="section bg-cream"><div className="container-max"><Reveal><SectionTitle eyebrow="Dalam program ini">Hal-hal yang akan kamu pelajari</SectionTitle></Reveal><div className="mt-12 divide-y divide-cocoa/15 border-y border-cocoa/15">{topics.map(([number, title, description], index) => <Reveal key={number} delay={index * .05} className="grid gap-3 py-6 sm:grid-cols-[90px_1fr_1fr] sm:items-baseline sm:gap-8"><span className="font-serif text-3xl text-coral">{number}</span><h3 className="font-serif text-2xl text-espresso">{title}</h3><p className="leading-7 text-espresso/70">{description}</p></Reveal>)}</div></div></section>
    <section className="section bg-cocoa text-cream"><div className="container-max"><Reveal><p className="eyebrow text-sky-blue">Mengapa ini penting</p><h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{homepage.impact.heading}</h2></Reveal><div className="mt-12 grid gap-6 md:grid-cols-3">{homepage.impact.items.map(([title, description], index) => <Reveal key={title} delay={index * .08} className="border-t border-cream/30 pt-5"><h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 leading-7 text-cream/85">{description}</p></Reveal>)}</div></div></section>
    <section className="section bg-white"><div className="container-max grid gap-12 lg:grid-cols-[.8fr_1fr] lg:items-center"><Reveal className="order-2 lg:order-1"><div className="overflow-hidden rounded-[32px_32px_32px_4px] bg-soft-blush"><img src={homepage.coach.image || '/assets/img/upload/Folder%20Upload%20All%20Mentor/Foto%20mentor/DSC00490.jpeg'} alt={homepage.coach.imageAlt} className="aspect-[4/5] w-full object-cover" /></div></Reveal><Reveal className="order-1 lg:order-2" delay={.1}><SectionTitle eyebrow={homepage.coach.eyebrow}>{homepage.coach.heading}</SectionTitle><p className="mt-6 leading-8 text-espresso/75">{homepage.coach.description}</p><div className="mt-7 flex items-center gap-3 text-cocoa"><HeartHandshake size={23} /><span className="font-medium">{homepage.coach.title}</span></div><p className="mt-4 text-sm leading-6 text-espresso/60">Berpengalaman lebih dari 10 tahun mendampingi proses reflektif dan pertumbuhan personal.</p><Link to="/tentang" className="mt-8 inline-flex items-center gap-2 font-medium text-coral transition hover:text-cocoa">Kenali Relung Jiwa <ArrowRight size={17} /></Link></Reveal></div></section>
    <section className="section bg-cream"><div className="container-max grid gap-10 lg:grid-cols-[.9fr_1.1fr]"><Reveal><SectionTitle eyebrow="Membawa pulang sesuatu yang berarti">{homepage.outcomes.heading}</SectionTitle></Reveal><div className="space-y-4">{homepage.outcomes.items.map((item, index) => <Reveal key={item} delay={index * .06} className="flex gap-4 border-b border-cocoa/15 pb-4"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage text-white"><Check size={15} strokeWidth={3} /></span><p className="leading-7 text-espresso/75">{item}</p></Reveal>)}</div></div></section>
    <CmsTestimonialSection />
    <section className="section bg-cream"><div className="container-max"><Reveal className="relative overflow-hidden bg-cocoa px-7 py-14 text-center text-cream sm:px-12 sm:py-20"><Sparkles className="absolute left-8 top-8 text-sky-blue/80" /><p className="eyebrow text-sky-blue">{homepage.finalCTA.eyebrow}</p><h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">{homepage.finalCTA.heading}</h2><p className="mx-auto mt-5 max-w-xl text-lg text-cream/80">{homepage.finalCTA.description}</p><HomepageCTA className="btn btn-coral mt-8" cta={homepage.finalCTA.primaryCTA} /></Reveal></div></section>
    <WhatsAppFAB />
  </>
}
