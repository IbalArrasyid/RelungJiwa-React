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
        <h1 className="page-title">Semua Halaman</h1>
        <p className="mt-3 text-espresso/65">Kumpulan halaman HTML lama yang kini tersedia di aplikasi React.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => (
            <Link key={p.slug} to={`/pages/${p.slug}`} className="editorial-card p-6 transition hover:border-cocoa/35">
              <div>
                <p className="font-medium text-espresso">{p.title}</p>
                <p className="text-sm text-espresso/60 truncate">{p.file}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


