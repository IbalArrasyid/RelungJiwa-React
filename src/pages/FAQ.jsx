const faqs = [
  {
    q: 'Apakah hipnoterapi aman?',
    a: 'Aman bila dilakukan oleh praktisi terlatih. Anda tetap memiliki kendali penuh selama sesi, dan dapat menghentikan kapan saja.',
  },
  {
    q: 'Bagaimana prosesnya?',
    a: 'Dimulai dari asesmen singkat, diikuti relaksasi terarah dan sugesti yang disesuaikan dengan tujuan Anda. Kami juga memberi latihan untuk praktik mandiri.',
  },
  {
    q: 'Berapa lama waktu yang dibutuhkan?',
    a: 'Umumnya 60–90 menit per sesi. Jumlah sesi bergantung pada kebutuhan dan respons individu.',
  },
  {
    q: 'Apakah hasilnya terjamin?',
    a: 'Tidak ada jaminan seragam untuk semua orang. Kami fokus pada proses yang aman, realistis, dan mengikuti bukti ilmiah.',
  },
]

export default function FAQ() {
  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pertanyaan Umum</h1>
        <div className="mt-8 grid gap-4">
          {faqs.map((f) => (
            <div key={f.q} className="card">
              <div className="card-body">
                <p className="font-semibold text-slate-900">{f.q}</p>
                <p className="mt-1 text-sm text-slate-600">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


