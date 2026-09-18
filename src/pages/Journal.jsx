import { useMemo, useState } from 'react'
import { ArrowRight, BookOpen, CheckCircle2, Headphones, LockKeyhole, Mail, Play, Search, X } from 'lucide-react'

const categories = ['Semua Tulisan', 'Regulasi Emosi & Somatik', 'Memulihkan Luka Masa Lalu', 'Duka & Penerimaan', 'Jurnal Mandiri & Latihan', 'Surat dari Dehan']

const articles = [
  {
    id: 'cukup',
    category: 'Regulasi Emosi & Somatik',
    readTime: '5 menit',
    title: 'Seni Berkata “Cukup”: Menegakkan Batas Diri Tanpa Dibebani Rasa Bersalah',
    summary: 'Batas diri bukan tentang menjauhkan orang lain, melainkan pagar perlindungan agar kebutuhan kita tidak terus terabaikan.',
    image: '/assets/img/blog7-1.jpg',
    author: 'Praktik Harian',
  },
  {
    id: 'luka-lama',
    category: 'Memulihkan Luka Masa Lalu',
    readTime: '7 menit',
    title: 'Mengapa Memeluk Luka Masa Lalu Terasa Jauh Lebih Menakutkan dari Membayangkannya?',
    summary: 'Membuka rasa sakit sering terasa seperti keterbukaan yang rentan. Kita menelusurinya perlahan, dengan izin dari diri sendiri.',
    image: '/assets/img/curved-images/curved11.jpg',
    author: 'Audio Tersedia',
  },
  {
    id: 'grief-circle',
    category: 'Duka & Penerimaan',
    readTime: '6 menit',
    title: 'Grief Circle: Mengakui Bahwa Setiap Kehilangan Memiliki Irama Berduka yang Berbeda',
    summary: 'Masyarakat mengajarkan kita untuk cepat pulih. Padahal, duka punya ritmenya sendiri dan tak perlu dibandingkan.',
    image: '/assets/img/blog7-3.jpg',
    author: 'Praktik Hening',
  },
  {
    id: 'napas',
    category: 'Regulasi Emosi & Somatik',
    readTime: '9 menit',
    title: 'Napas yang Tersangkut di Dada: Bagaimana Stres Menetap di Sistem Saraf Kita',
    summary: 'Sebelum pikiran menyadari kecemasan, tubuh sering lebih dahulu memberi isyarat melalui napas yang memendek dan tegang.',
    image: '/assets/img/curved-images/curved8.jpg',
    author: 'Latihan Pernapasan',
  },
  {
    id: 'penolong',
    category: 'Surat dari Dehan',
    readTime: '4 menit',
    title: 'Surat Terbuka untuk Jiwa yang Terbiasa Menjadi Penolong bagi Semua Orang Kecuali Dirinya Sendiri',
    summary: 'Sebuah pesan hangat untukmu yang selalu ada bagi orang lain, tetapi lupa bertanya apa yang sedang kamu butuhkan.',
    image: '/assets/img/curved-images/curved6.jpg',
    author: 'Renungan Hati',
  },
  {
    id: 'ritual-pagi',
    category: 'Jurnal Mandiri & Latihan',
    readTime: '5 menit',
    title: 'Ritual Pagi 10 Menit: Memulai Hari Bukan dengan Rasa Dikejar, Melainkan Kehadiran Utuh',
    summary: 'Tiga pertanyaan sederhana untuk dibawa ke pagi hari, sebelum menyentuh notifikasi dan memulai pekerjaan.',
    image: '/assets/img/blog7-2.jpg',
    author: 'Template Refleksi',
  },
]

const featuredArticle = {
  id: 'kelelahan-emosional',
  category: 'Regulasi Emosi & Somatik',
  readTime: '8 menit',
  title: 'Ketika Tubuh Berteriak Lelah, Namun Pikiran Menolak Berhenti: Memahami Siklus Kelelahan Emosional Kronis',
  summary: 'Kita sering menganggap istirahat adalah kemewahan yang harus dicari setelah semua pekerjaan selesai. Nyatanya, rasa lelah batin tidak pernah bisa dibayar dengan satu hari tidur panjang jika sistem saraf terus berada dalam alarm siaga.',
  image: '/assets/img/curved-images/curved5.jpg',
  author: 'Dehan Mahardika, M.Psi.',
}

function matchesArticle(article, query, category) {
  const subject = `${article.title} ${article.summary} ${article.category}`.toLocaleLowerCase('id-ID')
  return (category === 'Semua Tulisan' || article.category === category) && subject.includes(query.toLocaleLowerCase('id-ID'))
}

function ArticleModal({ article, onClose }) {
  if (!article) return null

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-espresso/55 p-5" role="dialog" aria-modal="true" aria-labelledby="article-preview-title">
      <article className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-surface p-6 shadow-2xl sm:p-9">
        <div className="flex items-start justify-between gap-5">
          <div><p className="eyebrow text-coral">{article.category}</p><p className="mt-2 text-xs text-espresso/55">{article.readTime} baca · {article.author}</p></div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-espresso/65 transition hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa" aria-label="Tutup pratinjau artikel"><X size={20} aria-hidden="true" /></button>
        </div>
        <h2 id="article-preview-title" className="mt-6 font-serif text-3xl leading-tight text-espresso sm:text-4xl">{article.title}</h2>
        <img src={article.image} alt="" className="mt-6 aspect-[16/8] w-full rounded-lg object-cover" />
        <div className="mt-7 space-y-4 leading-7 text-espresso/70"><p>{article.summary}</p><p>Ruang ini mengajak kita berhenti sejenak, memberi nama pada yang terasa, dan membiarkan pemahaman datang tanpa paksaan.</p><p>Artikel lengkap akan segera tersedia. Sementara ini, simpan pertanyaan yang muncul dan kembali lagi ketika Anda memiliki ruang untuk membacanya dengan tenang.</p></div>
      </article>
    </div>
  )
}

function ArticleCard({ article, onOpen }) {
  return (
    <article className="group overflow-hidden rounded-xl bg-surface shadow-[0_8px_30px_-4px_rgba(41,35,33,.05)]">
      <img src={article.image} alt="" className="aspect-[16/10] w-full object-cover" />
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[.12em] text-cocoa"><span className="rounded-full bg-soft-blush px-2.5 py-1">{article.category}</span><span className="shrink-0 normal-case tracking-normal text-espresso/50">{article.readTime}</span></div>
        <h3 className="mt-4 font-serif text-2xl leading-tight text-espresso">{article.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-espresso/65">{article.summary}</p>
        <button type="button" onClick={() => onOpen(article)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cocoa transition hover:text-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa">{article.author}<span className="ml-1">Baca</span><ArrowRight size={15} aria-hidden="true" /></button>
      </div>
    </article>
  )
}

export default function Journal() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua Tulisan')
  const [activeArticle, setActiveArticle] = useState(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const visibleArticles = useMemo(() => articles.filter((article) => matchesArticle(article, query, category)), [query, category])
  const showFeatured = matchesArticle(featuredArticle, query, category)
  const resultCount = visibleArticles.length + (showFeatured ? 1 : 0)

  function subscribe(event) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <div className="overflow-hidden bg-surface">
      <section className="container-max pb-7 pt-12 sm:pb-9 sm:pt-16 lg:pt-20">
        <div className="max-w-4xl">
          <p className="eyebrow flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-coral" />Arsip Tulisan &amp; Literasi Batin · Ruang Membaca dengan Sadar</p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.03] tracking-[-.025em] text-espresso sm:text-5xl lg:text-6xl">Kata-kata yang Ditata untuk <em className="text-coral">Menemani Langkahmu</em> yang Lelah.</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-espresso/65 sm:text-lg sm:leading-8">Bukan sekadar artikel cepat atau tips produktivitas instan, melainkan esai mendalam, panduan introspeksi berakar, dan renungan jujur tentang seni merawat jiwa di tengah riuh dunia.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs leading-5 text-espresso/65"><span className="inline-flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2"><Headphones size={16} className="text-cocoa" aria-hidden="true" />Disediakan audio narasi hening untuk setiap tulisan</span><span className="inline-flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2"><BookOpen size={16} className="text-cocoa" aria-hidden="true" />Waktu baca rata-rata 5–8 menit</span></div>
        </div>
      </section>

      <section className="container-max pb-10">
        <div className="border-b border-cocoa/15 pb-5 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <label className="relative block max-w-xl flex-1"><Search size={19} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso/45" aria-hidden="true" /><span className="sr-only">Cari tulisan</span><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-lg bg-white py-3 pl-10 pr-4 text-sm text-espresso shadow-sm outline-none ring-cocoa/20 placeholder:text-espresso/40 focus:ring-2" placeholder="Cari renungan atau topik batin (misal: rasa bersalah, lelah fisik, memaafkan)..." /></label>
          <p className="mt-4 flex items-center gap-2 text-xs text-espresso/60 lg:mt-0"><span className="h-2 w-2 rounded-full bg-coral" />Menampilkan <strong>{resultCount} Esai &amp; Panduan Batin</strong></p>
        </div>
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pt-4 pb-1 sm:mx-0 sm:px-0" aria-label="Kategori Jurnal">
          {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa ${category === item ? 'bg-cocoa text-cream' : 'bg-surface-container text-espresso/65 hover:bg-surface-container-high'}`}>{item}</button>)}
        </div>
      </section>

      <section className="container-max pb-12 sm:pb-16">
        {showFeatured ? <article className="overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_-4px_rgba(41,35,33,.07)]"><div className="grid lg:grid-cols-12"><div className="relative min-h-[320px] lg:col-span-7 lg:min-h-[490px]"><img src={featuredArticle.image} alt="Buku jurnal dan secangkir teh di meja" className="absolute inset-0 h-full w-full object-cover" /><span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-cream/95 px-3 py-2 text-xs font-semibold text-cocoa shadow-sm"><CheckCircle2 size={15} className="text-coral" aria-hidden="true" />Esai Pilihan Pekan Ini</span></div><div className="flex flex-col justify-between p-6 sm:p-9 lg:col-span-5 lg:p-10"><div><p className="text-xs font-semibold uppercase tracking-[.13em] text-coral">Esai Utama · Batin Baca · {featuredArticle.author}</p><h2 className="mt-5 font-serif text-3xl leading-tight text-espresso sm:text-4xl">{featuredArticle.title}</h2><p className="mt-5 text-sm leading-7 text-espresso/65">{featuredArticle.summary}</p><div className="mt-5 flex items-center gap-3 rounded-lg bg-soft-blue/55 p-3 text-xs text-espresso/70"><span className="grid h-8 w-8 place-items-center rounded-full bg-cocoa text-cream"><Play size={14} fill="currentColor" aria-hidden="true" /></span><span><strong className="block text-espresso">Dengarkan Narasi Hening</strong>08:24 · Suara Tenang Coach Dehan</span></div></div><div className="mt-7 flex flex-wrap items-center justify-between gap-3 text-xs text-espresso/55"><span>◌ Cocok dibaca pagi hari</span><button type="button" onClick={() => setActiveArticle(featuredArticle)} className="btn btn-coral min-h-10 px-4 py-2 text-xs">Baca Esai Lengkap <ArrowRight size={15} aria-hidden="true" /></button></div></div></div></article> : null}

        <section className="mt-10 rounded-xl bg-surface-container-low p-6 sm:p-8"><div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><p className="eyebrow">Latihan Mingguan · Menemukan Keheningan Sejenak</p><h2 className="mt-3 font-serif text-3xl leading-tight text-espresso">Prompt Refleksi Pekan Ini: <em>Menamai yang Tak Terucap</em></h2><p className="mt-3 max-w-2xl font-serif text-lg italic leading-7 text-cocoa">“Jika rasa lelahmu saat ini memiliki suara, kalimat apa yang pertama kali ingin ia sampaikan tanpa takut dihakimi?”</p></div><div className="shrink-0 space-y-3"><button type="button" onClick={() => setActiveArticle({ ...articles[5], title: 'Prompt Refleksi Pekan Ini: Menamai yang Tak Terucap', summary: 'Gunakan tiga tahap sederhana: tulis tanpa sensor selama tiga menit, beri nama pada emosi yang terasa, lalu tutup halaman dengan satu kalimat yang menenangkan.' })} className="btn btn-quiet w-full min-h-10 px-4 py-2 text-xs"><BookOpen size={15} aria-hidden="true" />Tulis di Jurnal Pribadi Digital</button><p className="text-center text-xs text-espresso/50">Unduh lembar refleksi PDF segera hadir.</p></div></div></section>
      </section>

      <section className="container-max pb-14 sm:pb-20">
        <div className="flex flex-col gap-4 border-b border-cocoa/15 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Eksplorasi Tematik</p><h2 className="mt-3 font-serif text-4xl leading-tight text-espresso">Renungan Pilihan untuk Jiwa</h2></div><p className="flex items-center gap-2 text-xs text-espresso/55"><BookOpen size={16} aria-hidden="true" />Dapat diakses bebas · Dibaca secara berkala</p></div>
        {visibleArticles.length ? <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visibleArticles.map((article) => <ArticleCard key={article.id} article={article} onOpen={setActiveArticle} />)}</div> : <div className="mt-7 rounded-xl bg-surface-container-low p-10 text-center"><Search size={32} className="mx-auto text-espresso/35" aria-hidden="true" /><h3 className="mt-4 font-serif text-3xl text-espresso">Belum ada tulisan yang sesuai</h3><p className="mt-2 text-sm leading-6 text-espresso/60">Coba gunakan kata lain atau kembali ke semua tulisan.</p><button type="button" onClick={() => { setCategory('Semua Tulisan'); setQuery('') }} className="btn btn-quiet mt-5 min-h-10 py-2">Tampilkan Semua Tulisan</button></div>}
      </section>

      <section className="container-max pb-8 sm:pb-12"><div className="overflow-hidden rounded-xl bg-espresso px-6 py-9 text-cream shadow-[0_12px_32px_-12px_rgba(41,35,33,.42)] sm:px-9 lg:px-12 lg:py-11"><div className="grid gap-8 lg:grid-cols-12 lg:items-center"><div className="lg:col-span-7"><p className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.11em] text-cream/85"><Mail size={15} aria-hidden="true" />Surat Relung Jiwa · Terbit Tiap Kamis Pagi</p><h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Satu Renungan Lembut Mampir di Surel Anda, Mengawali Hari Tanpa Riuh.</h2><p className="mt-4 max-w-2xl leading-7 text-cream/75">Tanpa promosi agresif, tanpa spam. Hanya satu esai reflektif terpilih dan satu pertanyaan batin terarah untuk menemani akhir pekan dan meredakan letih pikiran.</p></div><div className="lg:col-span-5">{subscribed ? <div className="rounded-xl bg-cream/10 p-5 text-sm leading-6 text-cream"><strong className="block text-sky-blue">Terima kasih telah bergabung.</strong><p className="mt-2 text-cream/75">Surat sambutan pertama akan tiba di kotak masuk Anda. Selamat menikmati hening.</p></div> : <form onSubmit={subscribe} className="space-y-3"><label><span className="sr-only">Alamat surel</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg bg-white px-4 py-3.5 text-sm text-espresso outline-none ring-coral/40 placeholder:text-espresso/45 focus:ring-2" placeholder="Tuliskan alamat surel Anda..." /></label><button type="submit" className="btn btn-coral w-full">Berlangganan Surat Hening <ArrowRight size={17} aria-hidden="true" /></button><p className="flex items-start gap-2 text-xs leading-5 text-cream/60"><LockKeyhole size={14} className="mt-0.5 shrink-0" aria-hidden="true" />Privasi Anda aman bersama kami. Berhenti berlangganan kapan saja dengan satu klik.</p></form>}</div></div></div></section>


      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
    </div>
  )
}
