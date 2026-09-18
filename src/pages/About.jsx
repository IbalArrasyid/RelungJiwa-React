import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, Heart, HeartHandshake, Leaf, LockKeyhole, ShieldCheck, Sparkles, UsersRound, Wind } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useHomepage } from '../hooks/useHomepage'

const pillars = [
  {
    title: 'Ruang Aman Tanpa Penghakiman',
    description: 'Wadah hangat di mana setiap rasa marah, sesal, duka, atau kehampaan boleh diungkapkan seutuhnya. Kami tidak mengategorikan emosi menjadi baik atau buruk; semua diterima sebagai saksi jujur dari perjalanan kemanusiaan Anda.',
    quote: '“Penerimaan radikal mendahului kesembuhan sejati.”',
    icon: HeartHandshake,
    accent: 'text-coral/60',
  },
  {
    title: 'Kesadaran Berakar (Rooted)',
    description: 'Perpaduan selaras antara ilmu psikologi humanistik kontemporer dengan kearifan kontemplatif Timur. Latihan napas dan pembumian tubuh membantu menenangkan sistem saraf otonom sehingga batin menemukan kembali pusat gravitasinya.',
    quote: '“Tenang bukan berarti ketiadaan riak, melainkan berakar saat badai.”',
    icon: Wind,
    accent: 'text-sky-blue',
  },
  {
    title: 'Perjalanan Berkelanjutan',
    description: 'Kami menolak ilusi pemulihan instan ataupun motivasi semu berumur pendek. Pemulihan batin di Relung Jiwa dibangun atas dasar kebiasaan mikro yang penuh welas asih, bertahap, dan mampu Anda bawa mandiri ke dalam ritme harian.',
    quote: '“Langkah perlahan yang teguh melampaui lompatan terburu-buru.”',
    icon: Leaf,
    accent: 'text-cocoa/60',
  },
]

const ethics = [
  { title: 'Kerahasiaan Penuh', description: 'Semua narasi, refleksi jurnal, dan dinamika dalam sesi dilindungi kerahasiaan mutlak sesuai standar perlindungan data pribadi dan etika konseling.', icon: LockKeyhole },
  { title: 'Berpusat pada Manusia', description: 'Anda adalah pemegang kedaulatan atas kisah hidup Anda. Kami berperan sebagai pemandu cermin, bukan penentu arah atau pengambil keputusan batin Anda.', icon: UsersRound },
  { title: 'Kepekaan Budaya', description: 'Menghayati konteks kolektivitas keluarga Indonesia, nilai spiritual lokal, dan pergeseran generasi tanpa mendikte norma luar yang tidak selaras.', icon: Leaf },
  { title: 'Batas Profesional', description: 'Transparansi mengenai batas kompetensi non-klinis. Jika terindikasi kondisi akut, kami secara sigap merujuk pada jejaring psikiatri dan mitra medis.', icon: ShieldCheck },
]

function PrimaryCTA({ cta, label, className }) {
  if (!cta) return null
  const content = <>{label}<ArrowRight size={17} aria-hidden="true" /></>
  if (cta.type === 'internal') return <Link to={cta.path} className={className}>{content}</Link>
  return <a href={cta.url} className={className} target={cta.openInNewTab ? '_blank' : undefined} rel={cta.openInNewTab ? 'noreferrer' : undefined}>{content}</a>
}

function BreathingPause() {
  const [seconds, setSeconds] = useState(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (seconds === null || seconds < 0) return undefined
    if (seconds === 0) {
      const timeout = window.setTimeout(() => { setSeconds(null); setComplete(true) }, 1000)
      return () => window.clearTimeout(timeout)
    }
    const timeout = window.setTimeout(() => setSeconds((current) => current - 1), 1000)
    return () => window.clearTimeout(timeout)
  }, [seconds])

  const label = seconds === null ? (complete ? 'Terima Kasih Atas Jedamu' : 'Mulai Latihan Hening (4 Detik)') : seconds > 0 ? `Tarik Napas… ${seconds}` : 'Hembuskan dengan Lembut…'

  return <section className="container-max pb-14 sm:pb-20"><div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-surface-container-high p-6 sm:flex-row sm:p-8"><div className="flex items-center gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-cocoa/10 text-cocoa"><Wind size={29} aria-hidden="true" /></div><div><h2 className="font-serif text-2xl text-espresso">Jeda Satu Tarikan Napas</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-espresso/65">Sebelum melanjutkan membaca, rilekskan bahumu, kendurkan rahangmu, dan hembuskan perlahan.</p></div></div><button type="button" onClick={() => { setComplete(false); setSeconds(4) }} disabled={seconds !== null} className="btn btn-quiet shrink-0 disabled:cursor-not-allowed" aria-live="polite">{label}</button></div></section>
}

export default function About() {
  const homepage = useHomepage()
  const cta = homepage.finalCTA.primaryCTA

  return <>
    <section className="section pt-8 sm:pt-12">
      <div className="container-max grid gap-12 lg:grid-cols-[7fr_5fr] lg:items-center">
        <div>
          <p className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-cocoa/50" />Tentang Relung Jiwa</p>
          <h1 className="page-title mt-5 max-w-3xl">Ruang hening untuk <em className="text-cocoa">mengenali</em>, merangkul, dan memeluk kembali jiwamu.</h1>
          <p className="editorial-quote mt-7 max-w-2xl text-2xl leading-relaxed text-cocoa">“Di tengah deru dunia yang terus menuntut kita berlari, jiwa kita acap kali tertinggal jauh di belakang.”</p>
          <p className="mt-6 max-w-xl text-base leading-8 text-espresso/70 sm:text-lg">Relung Jiwa tercipta bukan sebagai bengkel tempat Anda diperbaiki, melainkan rumah peristirahatan bersahaja di mana kerentanan disambut tanpa tuntutan menjadi sempurna. Kami mendampingi Anda melangkah perlahan melintasi badai batin menuju rasa utuh dan berakar.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5"><PrimaryCTA cta={cta} label="Mulai Percakapan Awal" className="btn btn-coral" /><a href="#filosofi" className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa transition hover:text-coral">Pelajari Filosofi Kami <ArrowDown size={17} aria-hidden="true" /></a></div>
        </div>
        <div className="relative mx-auto w-full max-w-md pb-28 lg:max-w-none"><div className="relative overflow-hidden rounded-xl bg-surface-container shadow-[0_18px_45px_rgba(41,35,33,.12)]"><img src="/assets/img/upload/Folder%20Upload%20All%20Mentor/Foto%20mentor/DSC00539.jpeg" alt="Ruang reflektif Relung Jiwa" className="aspect-[4/5] w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 rounded-lg bg-surface-container-low/90 p-4 shadow-sm backdrop-blur-sm"><div className="flex items-center gap-2 text-cocoa"><Leaf size={18} aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-[.14em]">Sanctuary of Mind</span></div><p className="mt-2 text-sm leading-6 text-espresso/70">Setiap napas sadar adalah ikrar untuk berhenti menyakiti diri sendiri demi ekspektasi luar.</p></div></div><div className="absolute bottom-0 left-0 hidden max-w-[210px] rounded-xl bg-surface-container-lowest p-5 shadow-xl lg:block"><span className="font-serif text-3xl text-coral">1,240+</span><p className="mt-1 text-xs leading-5 text-espresso/65">Jiwa telah menemukan jeda hening dan penerimaan diri</p></div></div>
      </div>
    </section>

    <section className="section bg-surface-container"><div className="container-max grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-start"><div className="lg:sticky lg:top-8"><p className="eyebrow">Manifesto &amp; Alasan</p><h2 className="section-title mt-4 max-w-md">Mengapa Relung Jiwa Hadir di Tengah Bisingnya Dunia</h2><blockquote className="editorial-quote mt-7 rounded-xl bg-surface-container-low p-6 text-xl leading-relaxed text-cocoa shadow-sm">“Lelah mental yang paling berat bukanlah karena beban pekerjaan fisik semata, melainkan keharusan untuk selalu tampak baik-baik saja di depan mata semua orang.”</blockquote><p className="mt-4 text-xs text-espresso/55">Catatan Pendirian Relung Jiwa • 2021</p></div><div className="max-w-2xl space-y-7 border-l border-cocoa/20 pl-6 text-base leading-8 text-espresso/75 sm:pl-10 sm:text-lg"><p className="first-letter:mr-1 first-letter:font-serif first-letter:text-5xl first-letter:leading-none first-letter:text-cocoa">Kita hidup di era percepatan yang merayakan ketergesaan, pencapaian tak berujung, dan citra diri yang terkurasi rapi di layar ponsel. Di balik senyum yang terpampang, ribuan jiwa sedang berjuang dalam sunyi melawan keletihan emosional, kecemasan yang menggigit, serta kesepian eksistensial.</p><p>Sering kali, upaya mencari pertolongan terhalang oleh stigma kaku: ketakutan dilabeli lemah, rasa sungkan, atau suasana konseling yang terlampau dingin dan klinis bak ruang interogasi rumah sakit. Kita tidak membutuhkan vonis atas kepribadian kita; yang sesungguhnya kita rindukan adalah kehadiran penuh dari seorang manusia yang mau mendengarkan tanpa menghakimi.</p><div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm"><div className="flex items-center justify-between gap-4"><p className="font-semibold text-espresso">Transformasi Menuju Ketenangan Berakar</p><span className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-cocoa">Observasi Reflektif</span></div><div className="mt-7 h-28 w-full"><svg className="h-full w-full overflow-visible" fill="none" viewBox="0 0 500 70" role="img" aria-label="Transformasi dari keadaan batin terfragmentasi menuju keseimbangan dan hadir utuh"><path d="M 0,35 Q 25,60 50,35 T 100,35 T 150,5 T 175,65 T 200,10 T 225,55 T 250,35 Q 300,20 350,35 T 450,35 T 500,35" stroke="currentColor" className="text-cocoa/30" strokeDasharray="4 4" strokeWidth="2.5" /><path d="M 225,55 Q 260,35 300,35 T 380,35 T 460,35 T 500,35" stroke="currentColor" className="text-cocoa" strokeWidth="3" /><circle cx="225" cy="55" r="4.5" className="fill-coral" /><circle cx="500" cy="35" r="4.5" className="fill-cocoa" /></svg></div><div className="mt-4 flex justify-between gap-4 text-xs text-espresso/60"><span>Keadaan Batin Terfragmentasi</span><span className="text-right text-cocoa">Keseimbangan &amp; Hadir Utuh</span></div></div><p>Relung Jiwa dibangun untuk menutup jurang pemisah tersebut. Kami merancang sebuah oasis yang memadukan kedalaman empati Nusantara, praktik kesadaran penuh (mindfulness), dan dialog dialogis terstruktur. Di sini, air mata Anda dihormati sebagai bahasa jiwa yang butuh dibaca, bukan sekadar gejala yang harus diredam.</p></div></div></section>

    <section id="filosofi" className="section bg-surface"><div className="container-max"><div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Pilar Inti</p><h2 className="section-title mt-4">Tiga Akar Filosofi Relung Jiwa</h2><p className="mt-4 leading-7 text-espresso/65">Prinsip hidup yang memandu setiap sesi, setiap percakapan, dan setiap hening yang kami jaga bersama Anda.</p></div><div className="mt-12 grid gap-6 md:grid-cols-3">{pillars.map(({ title, description, quote, icon: Icon, accent }, index) => <article key={title} className="flex min-h-[370px] flex-col rounded-xl bg-surface-container-lowest p-7 shadow-sm"><div className="flex items-baseline justify-between"><span className={`font-serif text-6xl ${accent}`}>0{index + 1}</span><Icon className={index === 1 ? 'text-sky-blue' : 'text-cocoa'} size={27} aria-hidden="true" /></div><h3 className="mt-9 font-serif text-2xl leading-snug text-espresso">{title}</h3><p className="mt-4 leading-7 text-espresso/70">{description}</p><p className="mt-auto pt-6 font-serif text-sm italic leading-6 text-cocoa">{quote}</p></article>)}</div></div></section>

    <section className="section bg-surface-container-low"><div className="container-max"><div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_18px_45px_rgba(41,35,33,.10)]"><div className="grid lg:grid-cols-[5fr_7fr]"><div className="relative min-h-[360px]"><img src={homepage.coach.image || '/assets/img/upload/Folder%20Upload%20All%20Mentor/Foto%20mentor/DSC00490.jpeg'} alt={homepage.coach.imageAlt || 'Coach Dehan'} className="h-full w-full object-cover" /></div><div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12"><p className="eyebrow">Mengenal Fasilitator</p><h2 className="section-title mt-4">Coach Dehan</h2><p className="mt-2 text-sm text-cocoa">Certified Mindfulness Educator • Somatic Grounding Practitioner</p><div className="mt-6 rounded-lg bg-surface-container-low p-5"><p className="editorial-quote text-xl leading-snug text-cocoa">“Saya tidak di sini untuk memperbaiki Anda, karena Anda tidak rusak. Saya di sini untuk menemani Anda menemukan kembali jalan pulang ke diri sendiri.”</p></div><p className="mt-6 max-w-2xl leading-8 text-espresso/70">Setelah lebih dari sepuluh tahun mendampingi ratusan profesional, seniman, dan keluarga yang bergulat dengan kejenuhan (burnout) serta duka tak terucap, Coach Dehan menyadari bahwa apa yang manusia butuhkan bukanlah nasehat klise, melainkan ruang berlabuh yang tenang dan aman.</p><p className="mt-4 max-w-2xl leading-8 text-espresso/70">Pendekatannya mengakar pada tradisi kehadiran hening (holding space) yang dipadukan dengan kesadaran somatik tubuh, membimbing setiap individu mendengarkan kembali bisikan intuisi mereka yang tertutup oleh gemuruh ekspektasi sosial.</p><div className="mt-7 flex flex-wrap gap-2"><span className="rounded-full bg-surface-container px-3 py-2 text-xs font-semibold text-cocoa">Integrative Mindfulness Practitioner</span><span className="rounded-full bg-surface-container px-3 py-2 text-xs font-semibold text-cocoa">Somatic Experiencing Facilitator</span><span className="rounded-full bg-surface-container px-3 py-2 text-xs font-semibold text-cocoa">1,400+ Jam Sesi Reflektif</span></div></div></div></div></div></section>

    <section className="section bg-surface"><div className="container-max"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-md"><p className="eyebrow">Integritas &amp; Batasan</p><h2 className="section-title mt-4">Prinsip Etis Ruang Relung Jiwa</h2></div><p className="max-w-sm text-sm leading-7 text-espresso/65">Kepercayaan batin Anda adalah komitmen tertinggi kami. Setiap interaksi dilandasi pedoman etis yang ketat.</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{ethics.map(({ title, description, icon: Icon }, index) => <article key={title} className="flex min-h-64 flex-col justify-between rounded-xl bg-surface-container p-6 shadow-sm"><div><span className="grid h-10 w-10 place-items-center rounded-full bg-cocoa/10 text-cocoa"><Icon size={20} aria-hidden="true" /></span><h3 className="mt-6 font-serif text-xl leading-snug text-espresso">{title}</h3><p className="mt-3 text-sm leading-6 text-espresso/65">{description}</p></div><span className="mt-8 text-xs font-semibold uppercase tracking-[.14em] text-cocoa">Etika 0{index + 1}</span></article>)}</div></div></section>

    <BreathingPause />

    <section className="container-max pb-16 sm:pb-24"><div className="relative overflow-hidden rounded-xl bg-soft-blue/55 px-6 py-14 text-center sm:px-12 sm:py-20"><div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-sky-blue/30 blur-3xl" aria-hidden="true" /><div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-soft-blush/60 blur-3xl" aria-hidden="true" /><div className="relative mx-auto flex max-w-2xl flex-col items-center"><Heart className="text-cocoa" size={34} aria-hidden="true" /><h2 className="mt-5 font-serif text-4xl leading-tight text-espresso sm:text-5xl">Setiap langkah pemulihan dimulai dari keberanian untuk berhenti sejenak.</h2><p className="mt-5 text-lg leading-8 text-espresso/70">Tidak ada beban yang terlalu sepele atau terlampau berat untuk dibagikan. Kami siap menyambut Anda dengan secangkir kehangatan dan telinga yang sungguh mendengar.</p><div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"><PrimaryCTA cta={cta} label="Mulai Percakapan Awal" className="btn btn-coral" /><Link to="/layanan" className="btn bg-surface text-cocoa shadow-sm hover:bg-surface-container">Jelajahi Layanan Kami</Link></div><p className="mt-6 text-xs leading-5 text-espresso/50">Sesi tersedia tatap muka di Studio Hening Jakarta &amp; daring melalui ruang privat terenkripsi.</p></div></div></section>
  </>
}

