import { useEffect, useState } from 'react'

import { approvedFaqFallback } from '../data/faqFallback'
import { getPublicFAQs } from '../lib/cms'

export function useFAQs() {
  const [faqs, setFaqs] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    getPublicFAQs({ signal: controller.signal })
      .then((documents) => {
        setFaqs(documents)
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return
        }

        if (import.meta.env.DEV) {
          console.warn('Unable to load CMS FAQs; using approved static fallback.', error)
        }

        setFaqs(approvedFaqFallback)
      })

    return () => controller.abort()
  }, [])

  return faqs
}