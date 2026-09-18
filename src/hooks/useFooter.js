import { useEffect, useState } from 'react'

import { fetchFooter, footerFallback } from '../lib/cms'

export function useFooter() {
  const [footer, setFooter] = useState(footerFallback)

  useEffect(() => {
    let active = true

    fetchFooter().then((nextFooter) => {
      if (active) {
        setFooter(nextFooter)
      }
    })

    return () => {
      active = false
    }
  }, [])

  return footer
}
