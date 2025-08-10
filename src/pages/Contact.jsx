export default function Contact() {
  return (
    <section className="section">
      <div className="container-max grid gap-10 lg:grid-cols-2 items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Kontak</h1>
          <p className="mt-3 text-slate-600 max-w-prose">Hubungi kami untuk menjadwalkan sesi atau menanyakan layanan.</p>
          <div className="mt-6 space-y-3 text-slate-700">
            <p>WhatsApp: <a className="text-brand-700 hover:underline" href="https://wa.me/6281351780173" target="_blank" rel="noreferrer">+62 813-5178-0173</a></p>
            <p>Email: <a className="text-brand-700 hover:underline" href="mailto:uwak@relungjiwa.com">uwak@relungjiwa.com</a></p>
          </div>
          <div className="mt-6 card"><div className="card-body">
            <p className="font-semibold text-slate-900">Lokasi</p>
            <ul className="mt-2 text-sm text-slate-600 space-y-2">
              <li>Jakarta (by appointment)</li>
              <li>Online via Zoom/Meet</li>
            </ul>
          </div></div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="font-semibold text-slate-900">Kirim Pesan</p>
            <form className="mt-4 grid gap-4">
              <input className="h-11 rounded-xl border border-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Nama" />
              <input className="h-11 rounded-xl border border-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Email/WhatsApp" />
              <textarea className="min-h-[120px] rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ceritakan kebutuhan Anda" />
              <button type="button" className="btn btn-primary h-11">Kirim</button>
            </form>
            <p className="mt-3 text-xs text-slate-500">Dengan mengirim pesan, Anda menyetujui kami menghubungi balik untuk keperluan konsultasi.</p>
          </div>
        </div>
      </div>
    </section>
  )
}


