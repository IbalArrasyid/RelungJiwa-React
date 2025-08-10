export default function CTA() {
  return (
    <section className="section">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-brand-500 via-sky-500 to-indigo-500 text-white">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px)'}}/>
          <div className="relative p-8 sm:p-12 grid md:grid-cols-3 items-center gap-6">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold tracking-tight">Siap memulai perubahan yang bermakna?</h3>
              <p className="mt-2 text-white/90 max-w-prose">Mulai dengan sesi konsultasi singkat. Kami bantu memetakan kebutuhan dan strategi pemulihan yang realistis.</p>
            </div>
            <div className="flex md:justify-end">
              <a href="https://wa.me/6281351780173" target="_blank" rel="noreferrer" className="btn bg-white text-slate-900 hover:bg-slate-100 h-12 px-6 rounded-2xl">
                Bicara via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


