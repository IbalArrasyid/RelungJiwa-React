import { useEffect, useState } from 'react'

import { getPublicPrograms } from '../lib/cms'

export function usePrograms() {
  const [state, setState] = useState({ programs: null, hasError: false })

  useEffect(() => {
    const controller = new AbortController()

    if (import.meta.env.DEV) console.info('[CMS] Programs: loading')

    getPublicPrograms({ signal: controller.signal })
      .then((programs) => {
        if (import.meta.env.DEV) console.info(programs.length ? '[CMS] Programs: live data loaded' : '[CMS] Programs: empty CMS response')
        setState({ programs, hasError: false })
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return
        }

        if (import.meta.env.DEV) {
          console.warn('[CMS] Programs: request failed.', error)
        }

        setState({ programs: [], hasError: true })
      })

    return () => controller.abort()
  }, [])

  return state
}