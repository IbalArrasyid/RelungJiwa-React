import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function StaticPage() {
  const { slug } = useParams()
  const [manifest, setManifest] = useState([])
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch('/pages/manifest.json')
      .then(r => r.json())
      .then(setManifest)
  }, [])

  const entry = useMemo(() => manifest.find(p => p.slug === slug), [manifest, slug])

  useEffect(() => {
    if (!entry) return
    fetch(`/pages/${entry.file}`, { method: 'HEAD' })
      .then(r => { if (!r.ok) throw new Error('not found') })
      .catch(() => setNotFound(true))
  }, [entry])

  if (notFound) {
    return (
      <section className="section">
        <div className="container-max">
          <p className="text-slate-600">Halaman tidak ditemukan.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container-max card">
        <div className="card-body">
          {!entry && <p className="text-slate-600">Memuat...</p>}
          {entry && (
            <div className="w-full aspect-[4/3]">
              <iframe
                title={entry.title}
                src={`/pages/${entry.file}`}
                className="w-full h-[70vh] rounded-xl border border-slate-200"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


