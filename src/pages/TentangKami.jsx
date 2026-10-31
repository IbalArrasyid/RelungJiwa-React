import { PRACTITIONER, PRACTITIONER_CREDENTIALS } from '../data/practitioner'

export default function TentangKami() {
  return <main className="container-max py-12 sm:py-20">
    <header className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">Profil Praktisi</p>
      <h1 className="page-title mt-4">Dewi Kartini</h1>
      <p className="mt-5 text-lg leading-8 text-espresso/70">Praktisi hipnoterapi dengan latar sertifikasi dan pelatihan yang dicantumkan di bawah.</p>
    </header>
    <section className="mt-12" aria-labelledby="credential-heading">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Kompetensi &amp; Pelatihan</p><h2 id="credential-heading" className="section-title mt-2">Sertifikat dan pelatihan</h2></div><p className="max-w-xl text-sm leading-6 text-espresso/60">Informasi berikut ditampilkan sebagaimana diberikan oleh pemilik situs. Foto sertifikat dapat ditambahkan pada tiap kartu setelah berkas tersedia.</p></div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRACTITIONER_CREDENTIALS.map((credential) => <article key={`${credential.issuer}-${credential.title}`} className="overflow-hidden rounded-xl border border-cocoa/10 bg-surface-container-lowest shadow-sm">
          {credential.image ? <img src={credential.image} alt={`Dokumen ${credential.title}`} loading="lazy" className="aspect-[4/3] w-full object-cover" /> : <div className="grid aspect-[4/3] place-items-center bg-surface-container text-sm text-espresso/45">Foto sertifikat</div>}
          <div className="p-5"><p className="text-xs font-semibold uppercase tracking-[.12em] text-coral">{credential.issuer}</p><h3 className="mt-2 font-serif text-xl leading-snug text-espresso">{credential.title}</h3><p className="mt-3 text-xs text-espresso/50">{credential.category}</p></div>
        </article>)}
      </div>
    </section>
    <p className="mt-10 rounded-xl bg-soft-blue/50 p-5 text-sm leading-6 text-espresso/70">{PRACTITIONER.disclaimer}</p>
  </main>
}
