import { MessageCircle } from 'lucide-react'

import { useSiteSettings } from '../hooks/useSiteSettings'

export default function WhatsAppFAB() {
  const settings = useSiteSettings()

  if (!settings.whatsapp.url) {
    return null
  }

  return (
    <a
      href={settings.whatsapp.url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-coral text-white shadow-lg transition hover:bg-[#bd3935] focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
      aria-label="Hubungi Relung Jiwa melalui WhatsApp"
    >
      <MessageCircle size={25} aria-hidden="true" />
    </a>
  )
}
