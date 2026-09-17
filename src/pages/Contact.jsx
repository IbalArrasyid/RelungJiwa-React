import { useSiteSettings } from '../hooks/useSiteSettings'

export default function Contact() {
  const settings = useSiteSettings()
  const addressLines = settings.address ? settings.address.split(/\r?\n/).filter(Boolean) : []

  return (
    <section className="section">
      <div className="container-max grid gap-10 lg:grid-cols-2 items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Kontak</h1>
          <p className="mt-3 text-slate-600 max-w-prose">Hubungi kami untuk menjadwalkan sesi atau menanyakan layanan.</p>
          <div className="mt-6 space-y-3 text-slate-700">
            {settings.whatsapp.url && settings.whatsapp.number ? (
              <p>
                WhatsApp:{' '}
                <a className="text-brand-700 hover:underline" href={settings.whatsapp.url} target="_blank" rel="noreferrer">
                  {settings.whatsapp.number}
                </a>
              </p>
            ) : null}
            {settings.email ? (
              <p>
                Email: <a className="text-brand-700 hover:underline" href={'mailto:' + settings.email}>{settings.email}</a>
              </p>
            ) : null}
          </div>
          <div className="mt-6 card">
            <div className="card-body">
              <p className="font-semibold text-slate-900">Lokasi</p>
              {addressLines.length ? (
                <ul className="mt-2 text-sm text-slate-600 space-y-2">
                  {addressLines.map((line) => <li key={line}>{line}</li>)}
                </ul>
              ) : null}
            </div>
          </div>
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
