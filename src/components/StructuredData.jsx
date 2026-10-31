import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getStructuredData } from '../seo/structuredData'

/** Keeps JSON-LD in sync on client-side navigation; vite.config.js adds it to initial HTML. */
export default function StructuredData({ schema: pageSchema } = {}) {
  const { pathname } = useLocation()

  useEffect(() => {
    const existing = document.head.querySelector('#relungjiwa-jsonld')
    const schema = pageSchema || getStructuredData(pathname)

    if (!schema) {
      existing?.remove()
      return
    }

    const script = existing || document.createElement('script')
    script.id = 'relungjiwa-jsonld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema).replace(/</g, '\\u003c')
    if (!existing) document.head.appendChild(script)

    return () => script.remove()
  }, [pathname, pageSchema])

  return null
}
