import { useEffect, useState } from 'react'

import { fetchHeader, headerFallback } from '../lib/cms'

export function useHeader() {
  const [header, setHeader] = useState(headerFallback)

  useEffect(() => {
    let active = true

    fetchHeader().then((nextHeader) => {
      if (active) setHeader(nextHeader)
    })

    return () => {
      active = false
    }
  }, [])

  return header
}
