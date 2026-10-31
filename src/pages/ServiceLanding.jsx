import { Link, useParams } from 'react-router-dom'

const pages = {
  'hipnoterapi-kecemasan': {
    title: 'Hipnoterapi untuk Dukungan Kecemasan',
    intro: 'Jika kecemasan terasa mengganggu keseharian, percakapan reflektif dan relaksasi terarah dapat menjadi bagian dari dukungan komplementer. Pendekatan ini bersifat non-klinis dan tidak menggantikan evaluasi tenaga kesehatan.',
    heading: 'Pendampingan kecemasan yang menghormati ritme Anda',
    detail: 'Sesi membantu Anda mengenali pemicu, respons tubuh, dan tujuan pribadi secara bertahap. Kami tidak menjanjikan hasil yang sama untuk setiap orang; kebutuhan klinis perlu dibicarakan dengan psikolog atau dokter berizin.',
  },
  'trauma-healing': {
    title: 'Pendampingan Reflektif Pasca Pengalaman Sulit',
    intro: 'Memproses pengalaman sulit dapat memerlukan waktu dan dukungan yang sesuai. Relung Jiwa menyediakan ruang reflektif komplementer non-klinis yang menghormati batas serta kesiapan Anda.',
    heading: 'Ruang aman untuk memulai percakapan reflektif',
    detail: 'Sesi berfokus pada percakapan, regulasi diri, dan langkah yang Anda pilih sendiri. Ini bukan terapi trauma klinis. Untuk gejala berat atau kebutuhan perawatan, hubungi tenaga kesehatan mental berizin.',
  },
}

export default function ServiceLanding() {
  const { slug } = useParams()
  const page = pages[slug]
  if (!page) return <section className="container-max py-20"><h1 className="page-title">Halaman layanan tidak ditemukan</h1><Link className="btn btn-quiet mt-6" to="/layanan">Lihat semua layanan</Link></section>

  return <article className="container-max max-w-4xl py-12 sm:py-20">
    <p className="eyebrow">Pendampingan komplementer · Non-klinis</p>
    <h1 className="page-title mt-4">{page.title}</h1>
    <p className="mt-6 max-w-3xl text-lg leading-8 text-espresso/70">{page.intro}</p>
    <section className="mt-12 rounded-xl bg-surface-container-low p-6 sm:p-9">
      <h2 className="font-serif text-3xl text-espresso">{page.heading}</h2>
      <p className="mt-4 leading-7 text-espresso/70">{page.detail}</p>
    </section>
    <p className="mt-8 rounded-lg border border-cocoa/15 p-5 text-sm leading-6 text-espresso/65">Dewi Kartini menyediakan layanan komplementer/non-klinis, bukan diagnosis atau pengganti konsultasi dan perawatan dari tenaga kesehatan berizin.</p>
    <Link to="/kontak" className="btn btn-coral mt-8">Tanyakan sesi orientasi</Link>
  </article>
}
