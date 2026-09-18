import { ArrowRight, Battery, Brain, CalendarDays, CircleHelp, Compass, HeartHandshake, Leaf, LockKeyhole, MessageCircle, ShieldCheck, UsersRound, Wind } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useServices } from '../hooks/useServices'

const fallbackImages = [
  '/assets/editorial/studio-reflective.jpg',
  '/assets/editorial/journal-ritual.jpg',
  '/assets/editorial/guided-circle.jpg',
  '/assets/editorial/garden-sanctuary.jpg',
]

const serviceReference = [
  {
    id: 'sesi-01', number: '01', label: 'INDIVIDU', category: 'Konseling Reflektif Pribadi', title: 'Konseling 1-on-1 & Ruang Berbagi Pribadi',
    intro: '“Mengurai benang kusut dalam pikiran, memberi nama pada rasa yang lama terpendam, dan berdamai dengan kelelahan batin.”',
    details: [
      ['Untuk Siapa', 'Bagi Anda yang merasa kewalahan dengan kecemasan, kelelahan mental harian, atau kehilangan arah tujuan hidup.', HeartHandshake],
      ['Pengalaman Sesi', '60–75 menit dialog hening dan terstruktur dalam ruang yang sepenuhnya aman, non-patologis, dan rahasia.', Brain],
      ['Format Layanan', 'Daring (Video Terenkripsi Zoom) atau Tatap Muka di Studio Suaka Hening, Jakarta Selatan.', CircleHelp],
    ],
    cta: 'Jadwalkan Sesi Pribadi', secondary: 'Konsultasi Pra-Sesi (Gratis 15 Mnt)', imageNoteTitle: 'Ketersediaan Pekan Ini', imageNote: '4 Slot Tersisa',
  },
  {
    id: 'sesi-02', number: '02', label: 'PASANGAN', category: 'Dinamika Hubungan & Keintiman', title: 'Sesi Pasangan & Rekonsiliasi Ruang Emosional',
    intro: 'Fasilitasi komunikasi sadar untuk mengurai friksi tanpa saling menyalahkan, menemukan kembali kedekatan yang tergerus rutinitas.',
    details: [
      ['Mendengar Aktif', 'Belajar mengenali bahasa kebutuhan di balik nada amarah atau sikap defensif pasangan.', MessageCircle],
      ['Koregulasi Emosi', 'Latihan menenangkan sistem saraf bersama saat percakapan mulai memanas.', Wind],
      ['Pola Relasi Baru', 'Mengidentifikasi luka masa lalu yang terbawa ke dalam komitmen saat ini.', UsersRound],
    ],
    cta: 'Konsultasi Bersama Pasangan', metadata: 'Durasi 90 Menit / Sesi Bersama', imageQuote: '“Bukan tentang siapa yang memenangkan argumen, melainkan merawat ruang hening di antara dua hati.”',
  },
  {
    id: 'sesi-03', number: '03', label: 'TRANSISI & KARIR', category: 'Restorasi Kapasitas Diri', title: 'Pendampingan Transisi & Burnout Recovery',
    intro: 'Menghidupkan kembali vitalitas hidup bagi para profesional dan individu yang terperangkap dalam kepenatan kronis dan disorientasi nilai.',
    details: [
      ['Peta Kelelahan Sistemik (Nervous System Reset)', 'Mengidentifikasi apakah tubuh berada dalam fase hyper-arousal (panik berkelanjutan) atau hypo-arousal (mati rasa dan hilang minat total).', Battery],
      ['Penyelarasan Nilai Transisi (Career & Life Pivot)', 'Strategi navigasi perubahan: pindah jalur karir, kehilangan peran penting, pasca perceraian, atau transisi memasuki fase kedewasaan baru.', Compass],
    ],
    cta: 'Pulihkan Ritme Anda', metadata: 'Tersedia paket 4 minggu terpadu', imageNoteTitle: 'Tingkat Restorasi Kapasitas', imageNote: 'Fase 1 s/d 3', progress: true,
  },
  {
    id: 'sesi-04', number: '04', label: 'MINDFULNESS', category: 'Keluasan Kesadaran', title: 'Bimbingan Mindfulness & Integrasi Somatik',
    intro: 'Melatih kejernihan batin untuk tidak reaktif terhadap gelombang pikiran, kembali bersandar pada tubuh dengan penuh kelembutan.',
    details: [
      ['Meditasi Berakar Tubuh', 'Mendeteksi titik ketegangan tak sadar di leher, pundak, dan diafragma dengan teknik pemindaian somatik terpandu.', Wind],
      ['Jurnal Refleksi Terarah', 'Panduan menulis hening untuk menangkap persepsi dan dialog internal yang sering terabaikan di sela kesibukan.', Brain],
    ],
    cta: 'Pelajari Paket Mindfulness', metadata: 'Tersedia Sesi Privat & Kelas Kecil (Maks. 6 Orang)', imageNoteTitle: 'Latihan Somatik & Pernapasan', imageNote: 'Praktik harian yang membumi tanpa doktrin rumit.',
  },
]

const guidance = [
  ['A', 'Bagaimana etika kerahasiaan dijaga?', 'Segala percakapan, catatan reflektif, dan data pribadi berada di bawah protokol kerahasiaan ketat. Kami tidak pernah membagikan riwayat Anda kepada pihak ketiga atau platform korporasi mana pun.', 'Standar Kerahasiaan Non-Disclosure', LockKeyhole],
  ['B', 'Perbedaan dengan psikiatri klinis?', 'Relung Jiwa memfokuskan diri pada regulasi emosi, bimbingan makna hidup, dan kesadaran diri (mindfulness). Kami tidak memberikan diagnosis patologis ataupun meresepkan obat psikiatri klinis.', 'Rujukan ke Fasilitas Medis jika Diperlukan', ShieldCheck],
  ['C', 'Persiapan sebelum sesi pertama?', 'Cukup sediakan ruangan yang tenang bebas gangguan selama 60 menit, segelas air hangat, dan kesediaan untuk jujur pada diri sendiri. Anda tidak perlu menyiapkan presentasi atau catatan rumit.', 'Hadir apa adanya', HeartHandshake],
  ['D', 'Kebijakan penjadwalan ulang?', 'Kami memahami ritme hidup tidak selalu terprediksi. Anda dapat mengubah jadwal tanpa biaya hingga 24 jam sebelum waktu sesi yang disepakati melalui tautan kalender pribadi Anda.', 'Fleksibel & Menghormati Waktu Bersama', CalendarDays],
]

function ServiceAction({ cta, label, className }) {
  const content = <>{label}<ArrowRight size={16} aria-hidden="true" /></>
  if (cta?.type === 'internal') return <Link to={cta.path} className={className}>{content}</Link>
  if (cta?.url) return <a href={cta.url} target={cta.openInNewTab ? '_blank' : undefined} rel={cta.openInNewTab ? 'noreferrer' : undefined} className={className}>{content}</a>
  return <Link to="/kontak" className={className}>{content}</Link>
}

function ServiceImage({ item, index, cmsService }) {
  const image = cmsService?.image || fallbackImages[index]
  const alt = cmsService?.imageAlt || item.title
  return <div className="relative overflow-hidden rounded-xl bg-surface-container shadow-xl"><img src={image} alt={alt} className="aspect-[4/5] h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent" />{item.imageQuote ? <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-surface/95 p-4 shadow-md backdrop-blur-sm"><p className="font-serif text-sm italic leading-6 text-espresso">{item.imageQuote}</p></div> : item.progress ? <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-surface/95 p-4 shadow-md backdrop-blur-sm"><div className="flex items-center justify-between gap-3 text-xs font-semibold text-cocoa"><span>{item.imageNoteTitle}</span><span>{item.imageNote}</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-container-high"><div className="h-full w-[68%] rounded-full bg-coral" /></div><div className="mt-2 flex justify-between gap-2 text-[10px] text-espresso/60"><span>Henti Sejenak</span><span>Regulasi Tubuh</span><span>Rekonstruksi Nilai</span></div></div> : <div className={`absolute bottom-5 left-5 right-5 rounded-lg p-4 shadow-md backdrop-blur-sm ${index === 3 ? 'bg-soft-blue/90 text-cocoa' : 'bg-surface/95 text-espresso'}`}><div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-2"><span className={`h-2.5 w-2.5 shrink-0 rounded-full ${index === 0 ? 'bg-coral' : 'bg-cocoa'}`} /><span className="text-xs font-semibold">{item.imageNoteTitle}</span></div>{index === 0 ? <span className="shrink-0 text-xs text-espresso/60">{item.imageNote}</span> : null}</div>{index === 3 ? <p className="mt-1 text-xs leading-5">{item.imageNote}</p> : null}</div>}</div>
}

function ServicePanel({ item, index, cmsService }) {
  const reverse = index % 2 === 1
  const primaryClass = index === 0 || index === 2 ? 'btn btn-coral' : 'btn bg-cocoa text-cream hover:bg-cocoa/90'
  return <section id={item.id} className={`scroll-mt-8 overflow-hidden rounded-xl p-6 shadow-[0_8px_30px_-4px_rgba(41,35,33,.04)] sm:p-9 lg:p-10 ${reverse ? 'bg-surface-container-low' : 'bg-surface'}`}><div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-12"><div className={`order-1 lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}><div className="flex flex-wrap items-center gap-3"><span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${index === 1 ? 'bg-soft-blue text-cocoa' : index === 3 ? 'bg-cocoa text-cream' : 'bg-soft-blush text-cocoa'}`}>{item.number} / {item.label}</span><span className="text-xs font-semibold uppercase tracking-[.14em] text-espresso/50">{item.category}</span></div><h2 className="mt-5 font-serif text-4xl leading-tight text-espresso sm:text-5xl">{item.title}</h2><p className="mt-5 max-w-2xl font-serif text-xl italic leading-relaxed text-cocoa">{item.intro}</p><div className={`mt-7 grid gap-3 ${item.details.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>{item.details.map(([title, description, Icon]) => <article key={title} className="rounded-lg bg-surface-container p-4"><Icon size={20} className="text-cocoa" aria-hidden="true" /><h3 className="mt-3 text-sm font-semibold text-espresso">{title}</h3><p className="mt-2 text-xs leading-5 text-espresso/65">{description}</p></article>)}</div><div className="mt-7 flex flex-wrap items-center gap-4"><ServiceAction cta={cmsService?.cta} label={item.cta} className={primaryClass} />{item.secondary ? <Link to="/kontak" className="btn btn-quiet"><MessageCircle size={16} aria-hidden="true" />{item.secondary}</Link> : null}{item.metadata ? <span className="flex items-center gap-2 text-sm text-espresso/60"><CalendarDays size={17} className="text-cocoa" aria-hidden="true" />{item.metadata}</span> : null}</div></div><div className={`order-2 lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}><ServiceImage item={item} index={index} cmsService={cmsService} /></div></div></section>
}

export default function Services() {
  const services = useServices()
  const cmsServices = Array.isArray(services) ? services : []
  const consultationCTA = cmsServices[0]?.cta

  return <>
    <section className="relative overflow-hidden pb-12 pt-8 sm:pt-12"><div className="absolute -right-28 -top-20 h-80 w-80 rounded-full bg-soft-blush/60 blur-3xl" aria-hidden="true" /><div className="container-max relative grid gap-9 lg:grid-cols-[8fr_4fr] lg:items-end"><div><p className="eyebrow flex items-center gap-2"><Wind size={17} aria-hidden="true" />Layanan &amp; Pendampingan</p><h1 className="page-title mt-5 max-w-3xl">Pendampingan yang disesuaikan dengan ritme dan kedalaman kebutuhanmu.</h1></div><div className="rounded-lg bg-surface-container p-6 shadow-sm"><p className="leading-7 text-espresso/70">Relung Jiwa menghadirkan ruang aman untuk konseling emosional non-klinis, fasilitasi <em className="font-serif text-cocoa">mindfulness</em>, dan bimbingan refleksi terarah tanpa penghakiman.</p><p className="mt-5 flex items-center gap-2 text-xs font-semibold text-espresso/55"><LockKeyhole size={16} className="text-sky-blue" aria-hidden="true" />Etika Kerahasiaan 100% Terjaga</p></div></div></section>

    <div className="container-max"><nav className="sticky top-3 z-20 mb-10 rounded-lg bg-surface-container-low/90 p-2 shadow-[0_4px_20px_-2px_rgba(41,35,33,.07)] backdrop-blur-md" aria-label="Daftar layanan"><div className="flex gap-2 overflow-x-auto">{serviceReference.map((item) => <a key={item.id} href={`#${item.id}`} className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-cocoa transition hover:bg-cocoa hover:text-cream"><span className="mr-2 text-coral">{item.number}</span>{item.label === 'TRANSISI & KARIR' ? 'Transisi & Burnout' : item.label === 'MINDFULNESS' ? 'Mindfulness Terpadu' : item.label === 'PASANGAN' ? 'Pasangan & Relasi' : 'Sesi Individu (1-on-1)'}</a>)}<a href="#panduan" className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-espresso/55 transition hover:text-cocoa">Panduan Pra-Sesi</a></div></nav><div className="grid gap-9">{serviceReference.map((item, index) => <ServicePanel key={item.id} item={item} index={index} cmsService={cmsServices[index]} />)}</div></div>

    <section id="panduan" className="section pb-10"><div className="container-max"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Panduan Transparansi</p><h2 className="section-title mt-3">Apa yang Perlu Diketahui Sebelum Memulai</h2></div><p className="max-w-md leading-7 text-espresso/65">Kepastian dan rasa aman adalah pondasi utama kesembuhan batin. Kami transparan dalam batasan dan ruang lingkup kerja kami.</p></div><div className="mt-10 grid gap-4 md:grid-cols-2">{guidance.map(([letter, title, description, note, Icon]) => <article key={letter} className="flex min-h-64 flex-col justify-between rounded-lg bg-surface p-6 shadow-sm"><div><div className="flex items-center gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soft-blush text-sm font-bold text-cocoa">{letter}</span><h3 className="font-serif text-2xl leading-snug text-espresso">{title}</h3></div><p className="mt-5 leading-7 text-espresso/65">{description}</p></div><p className="mt-6 flex items-center gap-2 text-xs font-semibold text-espresso/50"><Icon size={16} className="text-cocoa" aria-hidden="true" />{note}</p></article>)}</div></div></section>

    <section className="container-max pb-16 sm:pb-24"><div className="relative overflow-hidden rounded-xl bg-espresso px-7 py-14 text-cream shadow-2xl sm:px-12 sm:py-20"><div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cocoa/70 blur-3xl" aria-hidden="true" /><div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sky-blue/15 blur-3xl" aria-hidden="true" /><div className="relative max-w-3xl"><p className="eyebrow text-sky-blue">Langkah Awal</p><h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Belum yakin layanan mana yang paling tepat untuk kondisimu saat ini?</h2><p className="mt-5 max-w-2xl font-serif text-xl italic leading-relaxed text-cream/75">Ambil jeda sejenak. Ceritakan singkat apa yang sedang bergemuruh di dalam hatimu melalui konsultasi pra-sesi 15 menit tanpa komitmen finansial.</p><div className="mt-8 flex flex-wrap gap-3"><ServiceAction cta={consultationCTA} label="Mulai Obrolan Pra-Sesi Gratis" className="btn btn-coral" /><Link to="/tentang" className="btn bg-white/10 text-cream hover:bg-white/20">Kenali Para Pendamping Kami</Link></div></div></div></section>
  </>
}

