export default function Packages() {
  const plans = [
    {
      name: 'Konseling (Online)',
      price: 'Rp 350.000/sesi',
      items: [
        'Asesmen singkat & perencanaan tujuan',
        'Konseling 60 menit via video',
        'Rangkuman langkah praktis',
      ],
      cta: 'Mulai Konseling',
    },
    {
      name: 'Hipnoterapi Standar',
      price: 'Rp 1.200.000/sesi',
      items: [
        'Sesi privat 75–90 menit (tatap muka / online)',
        'Induksi, pendalaman, dan sugesti terarah',
        'Latihan lanjutan untuk di rumah',
      ],
      cta: 'Pesan Sesi',
      featured: true,
    },
    {
      name: 'Hipnoterapi Intensif',
      price: 'Rp 2.500.000/sesi',
      items: [
        'Sesi privat intensif 90–120 menit',
        'Pendampingan chat 7 hari pasca sesi',
        'Rencana praktik personalisasi',
      ],
      cta: 'Atur Jadwal',
    },
  ]

  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Paket & Harga</h1>
        <p className="mt-3 text-slate-600 max-w-prose">
          Investasi untuk ketenangan jangka panjang. Harga dapat berubah sewaktu-waktu. Hasil tiap individu
          bervariasi tergantung kondisi dan konsistensi latihan.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`card ${p.featured ? 'ring-2 ring-brand-500' : ''}`}>
              <div className="card-body">
                <p className="text-slate-900 font-semibold">{p.name}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{p.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {p.items.map((it) => <li key={it}>• {it}</li>)}
                </ul>
                <a href="https://wa.me/6281351780173" target="_blank" rel="noreferrer" className="btn btn-primary h-10 px-4 mt-6 inline-flex">{p.cta}</a>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">Tidak ada jaminan kesembuhan instan; kami mendampingi proses perubahan yang realistis dan aman.</p>
      </div>
    </section>
  )
}


