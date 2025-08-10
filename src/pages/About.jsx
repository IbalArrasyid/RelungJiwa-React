export default function About() {
  return (
    <section className="section">
      <div className="container-max grid gap-10 lg:grid-cols-2 items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tentang Relung Jiwa</h1>
          <p className="mt-4 text-slate-600 max-w-prose">
            Relung Jiwa hadir sebagai ruang pemulihan yang hangat dan aman. Kami menggabungkan hipnoterapi
            dengan pendekatan psikologis modern untuk membantu Anda memetakan akar persoalan dan membangun
            kebiasaan baru yang lebih sehat.
          </p>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li>• Pendekatan empatik dan terstruktur</li>
            <li>• Praktisi tersertifikasi, berpengalaman &gt; 10 tahun</li>
            <li>• Sesi tatap muka dan online</li>
            <li>• Privasi dan kenyamanan terjaga</li>
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            Catatan: Layanan kami tidak menggantikan penanganan darurat medis maupun psikiatris. Hasil setiap
            individu dapat berbeda tergantung kondisi dan komitmen proses.
          </p>
        </div>
        <div className="card">
          <div className="card-body">
            <h2 className="text-xl font-semibold text-slate-900">Tim Praktisi</h2>
            <ul className="mt-4 space-y-4 text-slate-700">
              <li>
                <p className="font-medium">Hipnoterapis Senior</p>
                <p className="text-sm text-slate-600">Spesialis regulasi emosi, trauma ringan-sedang, dan kebiasaan.</p>
              </li>
              <li>
                <p className="font-medium">Psikolog Klinis Mitra</p>
                <p className="text-sm text-slate-600">Konseling, asesmen, dan psikoterapi berbasis bukti.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}


