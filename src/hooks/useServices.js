import { useEffect, useState } from 'react'

import { approvedServiceFallback } from '../data/serviceFallback'
import { getPublicServices } from '../lib/cms'

export function useServices() {
  const [services, setServices] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    getPublicServices({ signal: controller.signal })
      .then((documents) => {
        setServices(documents)
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return
        }

        if (import.meta.env.DEV) {
          console.warn('Unable to load CMS services; using approved static fallback.', error)
        }

        setServices(approvedServiceFallback)
      })

    return () => controller.abort()
  }, [])

  return services
}