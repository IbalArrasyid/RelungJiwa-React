import { approvedHomepageFallback } from '../data/homepageFallback'
import { approvedHeaderFallback } from '../data/headerFallback'
import { approvedFooterFallback } from '../data/footerFallback'
import { approvedSiteSettingsFallback } from '../data/siteSettingsFallback'

const configuredCMSURL = import.meta.env.VITE_CMS_URL?.trim()

function getCMSURL() {
  if (!configuredCMSURL) {
    throw new Error('VITE_CMS_URL is not configured.')
  }

  return configuredCMSURL.replace(/\/+$/, '')
}

export function buildCMSURL(path) {
  return new URL(path, `${getCMSURL()}/`).toString()
}

export function resolveCMSMediaURL(media) {
  const url = typeof media === 'string' ? media : media?.url

  if (!url) {
    return null
  }

  if (/^https?:\/\//i.test(url)) {
    return url
  }

  return buildCMSURL(url)
}

async function fetchCMSJSON(path, { signal } = {}) {
  const response = await fetch(buildCMSURL(path), { signal, cache: 'no-store' })

  if (!response.ok) {
    throw new Error(`CMS request failed with status ${response.status}.`)
  }

  return response.json()
}

function sortByEditorialOrder(first, second) {
  const firstOrder = Number.isFinite(first.sortOrder) ? first.sortOrder : 0
  const secondOrder = Number.isFinite(second.sortOrder) ? second.sortOrder : 0

  if (firstOrder !== secondOrder) {
    return firstOrder - secondOrder
  }

  return String(first.id).localeCompare(String(second.id), undefined, { numeric: true })
}

function normalizeTestimonial(testimonial) {
  return {
    id: testimonial.id,
    quote: testimonial.quote,
    context: testimonial.roleOrContext || testimonial.sourceLabel || testimonial.displayName,
    image: resolveCMSMediaURL(testimonial.profileImage),
    imageAlt: testimonial.profileImage?.alt || testimonial.displayName,
  }
}

function normalizeFAQ(faq) {
  return {
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    category: faq.category || null,
  }
}

export async function getPublicTestimonials({ signal } = {}) {
  const response = await fetchCMSJSON('/api/testimonials?limit=12&depth=1&sort=sortOrder', { signal })
  const documents = Array.isArray(response?.docs) ? response.docs : []

  return documents
    .filter((testimonial) => testimonial?._status === 'published' && testimonial.consentConfirmed === true)
    .sort(sortByEditorialOrder)
    .map(normalizeTestimonial)
}

export async function getPublicFAQs({ signal } = {}) {
  const response = await fetchCMSJSON('/api/faqs?limit=100&depth=0&sort=sortOrder', { signal })
  const documents = Array.isArray(response?.docs) ? response.docs : []

  return documents
    .filter(
      (faq) =>
        faq?._status === 'published' &&
        faq.active === true &&
        typeof faq.question === 'string' &&
        typeof faq.answer === 'string',
    )
    .sort(sortByEditorialOrder)
    .map(normalizeFAQ)
}
function isSafeRegistrationURL(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return null
  }

  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null
  } catch {
    return null
  }
}

function normalizeProgram(program) {
  const topics = Array.isArray(program.topics)
    ? program.topics.map((item) => item?.topic).filter((topic) => typeof topic === 'string' && topic.trim())
    : []
  const outcomes = Array.isArray(program.outcomes)
    ? program.outcomes.map((item) => item?.outcome).filter((outcome) => typeof outcome === 'string' && outcome.trim())
    : []

  return {
    id: program.id,
    title: program.title,
    slug: program.slug,
    shortDescription: program.shortDescription,
    description: typeof program.description === 'string' && program.description.trim() ? program.description : null,
    image: resolveCMSMediaURL(program.featuredImage),
    imageAlt: program.featuredImage?.alt || program.title,
    programType: program.programType || null,
    programStatus: program.programStatus || null,
    startDate: program.startDate || null,
    endDate: program.endDate || null,
    locationType: program.locationType || null,
    locationText: typeof program.locationText === 'string' && program.locationText.trim() ? program.locationText : null,
    registrationURL: isSafeRegistrationURL(program.registrationURL),
    price: typeof program.price === 'string' && program.price.trim() ? program.price : null,
    topics,
    outcomes,
    featured: program.featured === true,
  }
}

function sortPrograms(first, second) {
  if (first.featured !== second.featured) {
    return first.featured ? -1 : 1
  }

  const firstStart = typeof first.startDate === 'string' ? Date.parse(first.startDate) : Number.NaN
  const secondStart = typeof second.startDate === 'string' ? Date.parse(second.startDate) : Number.NaN

  if (!Number.isNaN(firstStart) && !Number.isNaN(secondStart) && firstStart !== secondStart) {
    return firstStart - secondStart
  }

  if (!Number.isNaN(firstStart) && Number.isNaN(secondStart)) {
    return -1
  }

  if (Number.isNaN(firstStart) && !Number.isNaN(secondStart)) {
    return 1
  }

  return String(first.id).localeCompare(String(second.id), undefined, { numeric: true })
}

export async function getPublicPrograms({ signal } = {}) {
  const response = await fetchCMSJSON('/api/programs?limit=24&depth=1&sort=startDate', { signal })
  const documents = Array.isArray(response?.docs) ? response.docs : []

  return documents
    .filter(
      (program) =>
        program?._status === 'published' &&
        typeof program.title === 'string' &&
        typeof program.shortDescription === 'string',
    )
    .map(normalizeProgram)
    .sort(sortPrograms)
}

function normalizeCTA(cta) {
  if (!cta || typeof cta.label !== 'string' || !cta.label.trim()) {
    return null
  }

  if (cta.type === 'internal') {
    if (typeof cta.path !== 'string' || !cta.path.startsWith('/') || cta.path.startsWith('//')) {
      return null
    }

    return {
      label: cta.label,
      type: 'internal',
      path: cta.path,
    }
  }

  if (cta.type !== 'external' || typeof cta.url !== 'string') {
    return null
  }

  try {
    const url = new URL(cta.url)

    if (!['http:', 'https:'].includes(url.protocol)) {
      return null
    }

    return {
      label: cta.label,
      type: 'external',
      url: url.toString(),
      openInNewTab: cta.openInNewTab === true,
    }
  } catch {
    return null
  }
}

function normalizeService(service) {
  return {
    id: service.id,
    title: service.title,
    slug: service.slug,
    shortDescription: service.shortDescription,
    description: typeof service.description === 'string' && service.description.trim() ? service.description : null,
    image: resolveCMSMediaURL(service.image),
    imageAlt: service.image?.alt || service.title,
    iconKey: typeof service.iconKey === 'string' && service.iconKey.trim() ? service.iconKey : null,
    cta: normalizeCTA(service.cta),
    featured: service.featured === true,
  }
}

export async function getPublicServices({ signal } = {}) {
  const response = await fetchCMSJSON('/api/services?limit=24&depth=1&sort=sortOrder', { signal })
  const documents = Array.isArray(response?.docs) ? response.docs : []

  return documents
    .filter(
      (service) =>
        service?._status === 'published' &&
        typeof service.title === 'string' &&
        typeof service.shortDescription === 'string',
    )
    .sort(sortByEditorialOrder)
    .map(normalizeService)
}
function configuredText(value) {
  return typeof value === 'string' && value.trim() ? value : null
}

function normalizeEmail(value) {
  const email = configuredText(value)
  if (!email) return null
  const trimmedEmail = email.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(trimmedEmail) ? trimmedEmail : null
}

function normalizeExternalURL(value) {
  const urlValue = configuredText(value)
  if (!urlValue) return null
  try {
    const url = new URL(urlValue)
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null
  } catch {
    return null
  }
}

function normalizeWhatsApp(number, message, { reportInvalid = true } = {}) {
  const configuredNumber = configuredText(number)
  if (!configuredNumber) return { number: null, message: null, url: null }

  const waNumber = configuredNumber.replace(/[\s()-]/g, '').replace(/^\+/, '')
  if (!/^[1-9]\d{6,14}$/.test(waNumber)) {
    if (reportInvalid && import.meta.env.DEV) {
      console.warn('SiteSettings WhatsApp number is invalid; omitting the WhatsApp link.')
    }
    return { number: configuredNumber, message: configuredText(message), url: null }
  }

  const configuredMessage = configuredText(message)
  const baseURL = 'https://wa.me/' + waNumber
  return {
    number: configuredNumber,
    message: configuredMessage,
    url: configuredMessage ? baseURL + '?text=' + encodeURIComponent(configuredMessage) : baseURL,
  }
}

function normalizeSiteSettings(settings, { fallback = siteSettingsFallback, reportInvalid = true } = {}) {
  const source = settings && typeof settings === 'object' ? settings : {}
  const sourceWhatsAppNumber = configuredText(source.whatsappNumber)
  const sourceEmail = configuredText(source.email)
  const whatsapp = normalizeWhatsApp(
    sourceWhatsAppNumber || fallback.whatsapp.number,
    configuredText(source.whatsappDefaultMessage) || fallback.whatsapp.message,
    { reportInvalid: sourceWhatsAppNumber ? reportInvalid : false },
  )
  const email = sourceEmail ? normalizeEmail(sourceEmail) : fallback.email

  if (sourceEmail && !email && reportInvalid && import.meta.env.DEV) {
    console.warn('SiteSettings email is invalid; omitting the email link.')
  }

  return {
    siteName: configuredText(source.siteName) || fallback.siteName,
    shortDescription: configuredText(source.shortDescription) || fallback.shortDescription,
    whatsapp,
    email,
    phone: configuredText(source.phone) || fallback.phone,
    address: configuredText(source.address) || fallback.address,
    businessHours: configuredText(source.businessHours) || fallback.businessHours,
    social: {
      instagram: normalizeExternalURL(source.instagram),
      youtube: normalizeExternalURL(source.youtube),
      tiktok: normalizeExternalURL(source.tiktok),
      linkedin: normalizeExternalURL(source.linkedin),
    },
  }
}

const rawSiteSettingsFallback = {
  siteName: approvedSiteSettingsFallback.siteName,
  shortDescription: approvedSiteSettingsFallback.shortDescription,
  whatsapp: {
    number: approvedSiteSettingsFallback.whatsappNumber,
    message: approvedSiteSettingsFallback.whatsappDefaultMessage,
  },
  email: approvedSiteSettingsFallback.email,
  phone: approvedSiteSettingsFallback.phone,
  address: approvedSiteSettingsFallback.address,
  businessHours: approvedSiteSettingsFallback.businessHours,
}

export const siteSettingsFallback = normalizeSiteSettings(approvedSiteSettingsFallback, {
  fallback: rawSiteSettingsFallback,
  reportInvalid: false,
})

let siteSettingsRequest

export function fetchSiteSettings() {
  if (!siteSettingsRequest) {
    const request = fetchCMSJSON('/api/globals/site-settings')
      .then((settings) => normalizeSiteSettings(settings))
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.warn('Unable to load CMS SiteSettings; using approved static fallback.', error)
        }
        return siteSettingsFallback
      })
    siteSettingsRequest = request
    request.finally(() => {
      if (siteSettingsRequest === request) siteSettingsRequest = null
    })
  }

  return siteSettingsRequest
}
function normalizeFooterLink(link) {
  const label = configuredText(link?.label)

  if (!label) return null
  if (link.type === 'internal') {
    if (typeof link.path !== 'string' || !link.path.startsWith('/') || link.path.startsWith('//') || link.path.includes('\\')) return null
    return { label, type: 'internal', path: link.path }
  }

  if (link.type !== 'external') return null
  const url = normalizeExternalURL(link.url)
  return url ? { label, type: 'external', url, openInNewTab: link.openInNewTab === true } : null
}

function normalizeFooter(footer) {
  const groups = Array.isArray(footer?.linkGroups)
    ? footer.linkGroups
      .map((group) => {
        const title = configuredText(group?.title)
        const links = Array.isArray(group?.links) ? group.links.map((item) => normalizeFooterLink(item?.link)).filter(Boolean) : []
        return title && links.length ? { title, links } : null
      })
      .filter(Boolean)
    : []

  return {
    linkGroups: groups.length ? groups : footerFallback.linkGroups,
    copyrightText: configuredText(footer?.copyrightText) || footerFallback.copyrightText,
    showSocialLinks: footer?.showSocialLinks !== false,
  }
}

export const footerFallback = {
  linkGroups: approvedFooterFallback.linkGroups,
  copyrightText: approvedFooterFallback.copyrightText,
  showSocialLinks: approvedFooterFallback.showSocialLinks,
}

let footerRequest

export function fetchFooter() {
  if (!footerRequest) {
    const request = fetchCMSJSON('/api/globals/footer')
      .then((footer) => normalizeFooter(footer))
      .catch((error) => {
        if (import.meta.env.DEV) console.warn('Unable to load CMS Footer; using approved static fallback.', error)
        return footerFallback
      })
    footerRequest = request
    request.finally(() => {
      if (footerRequest === request) footerRequest = null
    })
  }

  return footerRequest
}
const applicationPaths = new Set(['/', '/tentang', '/layanan', '/paket', '/program', '/jurnal', '/faq', '/kontak'])

function normalizeHeaderLink(link, label, id) {
  const normalizedLabel = configuredText(label)
  if (!normalizedLabel) return null

  if (link?.type === 'internal') {
    if (!applicationPaths.has(link.path)) return null
    return { id: id || normalizedLabel, label: normalizedLabel, type: 'internal', href: link.path, openInNewTab: false }
  }

  if (link?.type !== 'external') return null
  const href = normalizeExternalURL(link.url)
  return href ? { id: id || normalizedLabel, label: normalizedLabel, type: 'external', href, openInNewTab: link.openInNewTab === true } : null
}

function normalizeHeader(header) {
  const navigationItems = Array.isArray(header?.navigationItems)
    ? header.navigationItems.map((item) => normalizeHeaderLink(item?.link, item?.label, item?.id)).filter(Boolean)
    : []
  const primaryCTA = normalizeHeaderLink(header?.primaryCTA, header?.primaryCTA?.label)

  const useFallbackNavigation = navigationItems.length === 0
  const useFallbackCTA = !primaryCTA

  if (import.meta.env.DEV) {
    if (useFallbackNavigation) console.info('[CMS] Header: using fallback because CMS navigation is empty or invalid.')
    if (useFallbackCTA) console.info('[CMS] Header: using fallback CTA because CMS CTA is incomplete.')
  }

  return {
    navigationItems: useFallbackNavigation ? headerFallback.navigationItems : navigationItems,
    primaryCTA: primaryCTA || headerFallback.primaryCTA,
  }
}

export const headerFallback = {
  navigationItems: approvedHeaderFallback.navigationItems,
  primaryCTA: approvedHeaderFallback.primaryCTA,
}

let headerRequest

export function fetchHeader() {
  if (!headerRequest) {
    const request = fetchCMSJSON('/api/globals/header')
      .then((header) => normalizeHeader(header))
      .catch((error) => {
        if (import.meta.env.DEV) console.warn('Unable to load CMS Header; using approved static fallback.', error)
        return headerFallback
      })
    headerRequest = request
    request.finally(() => {
      if (headerRequest === request) headerRequest = null
    })
  }

  return headerRequest
}
function homepageText(value, fallback) { return configuredText(value) || fallback }

function homepageItems(items, fallback, max, mapper) {
  if (!Array.isArray(items)) return fallback.slice(0, max)
  return fallback.slice(0, max).map((base, index) => mapper(items[index], base)).filter(Boolean)
}

function normalizeHomepage(homepage) {
  const fallback = approvedHomepageFallback
  const heroCTA = normalizeCTA(homepage?.primaryCTA) || fallback.hero.primaryCTA
  const finalCTA = normalizeCTA(homepage?.finalCTAPrimary) || fallback.finalCTA.primaryCTA
  return {
    hero: { ...fallback.hero, eyebrow: homepageText(homepage?.eyebrow, fallback.hero.eyebrow), heading: homepageText(homepage?.heading, fallback.hero.heading), highlightedText: homepageText(homepage?.highlightedText, fallback.hero.highlightedText), description: homepageText(homepage?.description, fallback.hero.description), primaryCTA: heroCTA, image: resolveCMSMediaURL(homepage?.image) || fallback.hero.image, imageAlt: homepageText(homepage?.imageAltOverride || homepage?.image?.alt, fallback.hero.imageAlt) },
    recognition: { ...fallback.recognition, eyebrow: homepageText(homepage?.recognitionEyebrow, fallback.recognition.eyebrow), heading: homepageText(homepage?.recognitionHeading, fallback.recognition.heading), intro: homepageText(homepage?.recognitionIntro, fallback.recognition.intro), items: homepageItems(homepage?.recognitionItems, fallback.recognition.items, 4, (item, base) => homepageText(item?.title, base)) },
    insight: { ...fallback.insight, heading: homepageText(homepage?.insightHeading, fallback.insight.heading), description: homepageText(homepage?.insightDescription, fallback.insight.description) },
    impact: { ...fallback.impact, heading: homepageText(homepage?.impactHeading, fallback.impact.heading), intro: configuredText(homepage?.impactIntro) || fallback.impact.intro, items: homepageItems(homepage?.impactItems, fallback.impact.items, 3, (item, base) => [homepageText(item?.title, base[0]), homepageText(item?.description, base[1])]) },
    coach: { ...fallback.coach, eyebrow: homepageText(homepage?.coachEyebrow, fallback.coach.eyebrow), heading: homepageText(homepage?.coachHeading, fallback.coach.heading), title: homepageText(homepage?.coachTitle, fallback.coach.title), description: homepageText(homepage?.coachDescription, fallback.coach.description), image: resolveCMSMediaURL(homepage?.coachImage) || fallback.coach.image, imageAlt: homepageText(homepage?.coachImage?.alt, fallback.coach.imageAlt) },
    outcomes: { ...fallback.outcomes, heading: homepageText(homepage?.outcomesHeading, fallback.outcomes.heading), items: homepageItems(homepage?.outcomeItems, fallback.outcomes.items, 5, (item, base) => homepageText(item?.title, base)) },
    finalCTA: { ...fallback.finalCTA, eyebrow: homepageText(homepage?.finalCTAEyebrow, fallback.finalCTA.eyebrow), heading: homepageText(homepage?.finalCTAHeading, fallback.finalCTA.heading), description: homepageText(homepage?.finalCTADescription, fallback.finalCTA.description), primaryCTA: finalCTA },
  }
}

export const homepageFallback = normalizeHomepage({})

let homepageRequest

export function fetchHomepage() {
  if (!homepageRequest) {
    const request = fetchCMSJSON('/api/globals/homepage').then(normalizeHomepage).catch((error) => {
      if (import.meta.env.DEV) console.warn('Unable to load CMS Homepage; using approved static fallback.', error)
      return homepageFallback
    })
    homepageRequest = request
    request.finally(() => { if (homepageRequest === request) homepageRequest = null })
  }
  return homepageRequest
}

