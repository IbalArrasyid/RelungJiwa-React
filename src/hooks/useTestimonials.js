import { useEffect, useState } from 'react'

import { approvedTestimonialFallback } from '../data/testimonialFallback'
import { getPublicTestimonials } from '../lib/cms'

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    getPublicTestimonials({ signal: controller.signal })
      .then((documents) => {
        setTestimonials(documents)
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return
        }

        if (import.meta.env.DEV) {
          console.warn('Unable to load CMS testimonials; using approved static fallback.', error)
        }

        setTestimonials(approvedTestimonialFallback)
      })

    return () => controller.abort()
  }, [])

  return testimonials
}
