export default function Services() {
  const services = [
    {
      title: 'Hipnoterapi Kecemasan',
      desc: 'Menenangkan respon fisik dan kognitif berlebih, membangun rasa aman baru.',
    },
    {
      title: 'Hipnoterapi Insomnia',
      desc: 'Mencetak ulang kebiasaan tidur dengan relaksasi terarah dan sleep hygiene.',
    },
    {
      title: 'Manajemen Stres',
      desc: 'Teknik regulasi emosi, fokus, dan penguatan coping harian.',
    },
    {
      title: 'Kebiasaan & Perilaku',
      desc: 'Merokok, makan berlebih, menunda; ubah pola pikir dan perilaku bertahap.',
    },
    {
      title: 'Pemulihan Emosi & Trauma Ringan–Sedang',
      desc: 'Memproses peristiwa yang membekas dengan aman dan penuh kendali.',
    },
    {
      title: 'Peningkatan Performa',
      desc: 'Fokus, public speaking, dan kesiapan kompetisi dengan visualisasi mental.',
    },
  ]

  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Layanan</h1>
        <p className="mt-3 text-slate-600 max-w-prose">
          Setiap layanan dimulai dengan asesmen singkat untuk memetakan kebutuhan Anda. Rencana intervensi
          disesuaikan dengan tujuan personal, dan kami memberi latihan yang mudah diterapkan sehari-hari.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="card">
              <div className="card-body">
                <p className="font-semibold text-slate-900">{s.title}</p>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


