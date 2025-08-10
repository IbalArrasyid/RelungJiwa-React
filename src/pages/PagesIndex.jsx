import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PagesIndex() {
  const [pages, setPages] = useState([])

  useEffect(() => {
    fetch('/pages/manifest.json').then(r => r.json()).then(setPages)
  }, [])

  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Semua Halaman</h1>
        <p className="mt-2 text-slate-600">Kumpulan halaman HTML lama yang kini tersedia di aplikasi React.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => (
            <Link key={p.slug} to={`/pages/${p.slug}`} className="card">
              <div className="card-body">
                <p className="font-medium text-slate-900">{p.title}</p>
                <p className="text-sm text-slate-600 truncate">{p.file}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


