import { fetchSiteSettings, siteSettingsFallback } from '../lib/cms'
import { useEffect, useState } from 'react'

export function useSiteSettings() {
  const [settings, setSettings] = useState(siteSettingsFallback)

  useEffect(() => {
    let active = true

    fetchSiteSettings().then((nextSettings) => {
      if (active) {
        setSettings(nextSettings)
      }
    })

    return () => {
      active = false
    }
  }, [])

  return settings
}
