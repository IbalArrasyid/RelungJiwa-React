import { PRACTITIONER_PERSON_SCHEMA } from '../data/practitioner.js'
import { findPublishedArticle } from '../data/publishedArticles.js'

const SITE_URL = 'https://relungjiwa.site'
const SITE_NAME = 'Relung Jiwa'
const ORG_ID = `${SITE_URL}/#organization`

// TODO: Isi dengan @id Coach Dehan jika profil publik tersedia, atau hapus baris ini
// jika Coach Dehan tidak lagi dipertahankan dalam schema.
const COACH_DEHAN_SCHEMA_ID = null // TODO: 'https://relungjiwa.site/tentang/#coach-dehan'

export const contactFaqItems = [
  {
    question: 'Berapa lama pesan saya akan dibalas?',
    answer: 'Pesan melalui formulir surel maupun WhatsApp akan direspons secara langsung oleh tim fasilitator kami dalam 2 hingga 4 jam selama jam operasional (09.00 – 18.00 WIB). Pesan yang masuk di malam hari akan disambut pertama kali keesokan paginya.',
  },
  {
    question: 'Bolehkah saya menghubungi tanpa nama asli?',
    answer: 'Tentu saja. Anda sepenuhnya berhak menggunakan nama panggilan, nama pena, atau inisial satu huruf. Rasa aman psikologis dan kenyamanan Anda adalah syarat mutlak dalam seluruh proses pendampingan di Relung Jiwa.',
  },
  {
    question: 'Bagaimana jika saya bingung memilih fasilitator?',
    answer: 'Anda tidak perlu cemas. Tuliskan saja apa yang sedang Anda rasakan pada formulir di atas atau pilih sesi orientasi 15 menit. Tim kami akan mendengarkan kebutuhan unik Anda dan memberikan rekomendasi fasilitator yang paling selaras.',
  },
]

const siteGraph = [
  {
    '@type': 'LocalBusiness',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.jpg`,
    logo: `${SITE_URL}/assets/img/logos/logo-relungjiwa.svg`,
    description: 'Pendampingan konseling reflektif non-klinis, mindfulness, dan hipnoterapi di Tebet, Jakarta Selatan.',
    telephone: '+6281351780173',
    email: 'uwak@relungjiwa.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Tebet Barat Dalam VIK No.13, RT.5/RW.4, Tebet Barat',
      addressLocality: 'Jakarta Selatan',
      addressRegion: 'DKI Jakarta',
      postalCode: '12810',
      addressCountry: 'ID',
    },
    founder: { '@id': PRACTITIONER_PERSON_SCHEMA['@id'] },
    // Coach Dehan diposisikan sebagai praktisi pendukung (employee), bukan founder.
    // Hapus baris employee jika Coach Dehan tidak lagi dipertahankan di schema.
    ...(COACH_DEHAN_SCHEMA_ID != null && { employee: { '@id': COACH_DEHAN_SCHEMA_ID } }),
    knowsAbout: 'Hipnoterapi non-klinis, pendampingan komplementer, manajemen kecemasan, manajemen stres',
  },
  {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: 'id-ID',
    publisher: { '@id': ORG_ID },
  },
  PRACTITIONER_PERSON_SCHEMA,
]

const pageGraph = {
  '/': siteGraph,
  '/layanan': [
    {
      '@type': 'MedicalWebPage',
      '@id': `${SITE_URL}/layanan/#webpage`,
      url: `${SITE_URL}/layanan/`,
      name: 'Hipnoterapi Kecemasan dan Layanan Pendampingan | Relung Jiwa',
      description: 'Informasi layanan komplementer dan non-klinis; bukan pengganti diagnosis atau perawatan tenaga kesehatan berizin.',
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/layanan/#anxiety` },
      author: { '@id': PRACTITIONER_PERSON_SCHEMA['@id'] },
      publisher: { '@id': ORG_ID },
      mainEntity: { '@id': `${SITE_URL}/layanan/#anxiety-service` },
    },
    {
      '@type': 'MedicalCondition',
      '@id': `${SITE_URL}/layanan/#anxiety`,
      name: 'Kecemasan',
      alternateName: 'Anxiety',
      description: 'Kecemasan dapat mencakup rasa khawatir dan respons fisik atau kognitif yang terasa berlebih. Halaman ini menjelaskan dukungan reflektif non-klinis, bukan diagnosis atau pengganti perawatan tenaga kesehatan.',
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/layanan/#anxiety-service`,
      name: 'Hipnoterapi untuk dukungan kecemasan',
      serviceType: 'Pendampingan hipnoterapi non-klinis',
      description: 'Sesi pendampingan untuk membantu klien mengeksplorasi pola kecemasan melalui relaksasi terarah dan percakapan reflektif. Hasil berbeda bagi setiap orang dan tidak dijamin.',
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'City', name: 'Jakarta Selatan' },
      audience: { '@type': 'PeopleAudience', audienceType: 'Orang dewasa yang mencari pendampingan non-klinis terkait kecemasan' },
      subjectOf: { '@id': `${SITE_URL}/layanan/#hypnotherapy` },
    },
    {
      '@type': 'MedicalTherapy',
      '@id': `${SITE_URL}/layanan/#hypnotherapy`,
      name: 'Hipnoterapi',
      description: 'Pendekatan relaksasi terarah yang ditawarkan sebagai pendampingan non-klinis. Bukan pengganti diagnosis, psikoterapi, atau perawatan medis.',
      relevantSpecialty: 'https://schema.org/Psychiatric',
    },
    PRACTITIONER_PERSON_SCHEMA,
  ],
  '/kontak': [
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/kontak/#faq`,
      url: `${SITE_URL}/kontak/`,
      name: 'Pertanyaan yang Sering Diajukan | Relung Jiwa',
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: contactFaqItems.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
  '/profil-praktisi': [PRACTITIONER_PERSON_SCHEMA],
  '/layanan/hipnoterapi-kecemasan': [
    { '@type': 'MedicalWebPage', '@id': `${SITE_URL}/layanan/hipnoterapi-kecemasan/#webpage`, url: `${SITE_URL}/layanan/hipnoterapi-kecemasan/`, name: 'Hipnoterapi Kecemasan | Relung Jiwa', description: 'Informasi pendampingan komplementer non-klinis terkait kecemasan.', inLanguage: 'id-ID', author: { '@id': PRACTITIONER_PERSON_SCHEMA['@id'] }, publisher: { '@id': ORG_ID }, mainEntity: { '@id': `${SITE_URL}/layanan/hipnoterapi-kecemasan/#service` } },
    { '@type': 'Service', '@id': `${SITE_URL}/layanan/hipnoterapi-kecemasan/#service`, name: 'Hipnoterapi untuk dukungan kecemasan', serviceType: 'Pendampingan komplementer non-klinis', description: 'Relaksasi terarah dan percakapan reflektif untuk mengeksplorasi pola kecemasan. Bukan diagnosis atau pengganti perawatan medis.', provider: { '@id': ORG_ID }, areaServed: { '@type': 'City', name: 'Jakarta Selatan' } },
    PRACTITIONER_PERSON_SCHEMA,
  ],
  '/layanan/trauma-healing': [
    { '@type': 'MedicalWebPage', '@id': `${SITE_URL}/layanan/trauma-healing/#webpage`, url: `${SITE_URL}/layanan/trauma-healing/`, name: 'Pendampingan Reflektif Pasca Pengalaman Sulit | Relung Jiwa', description: 'Informasi dukungan reflektif komplementer non-klinis untuk memproses pengalaman sulit dengan aman dan sesuai kesiapan.', inLanguage: 'id-ID', author: { '@id': PRACTITIONER_PERSON_SCHEMA['@id'] }, publisher: { '@id': ORG_ID }, mainEntity: { '@id': `${SITE_URL}/layanan/trauma-healing/#service` } },
    { '@type': 'Service', '@id': `${SITE_URL}/layanan/trauma-healing/#service`, name: 'Pendampingan reflektif pasca pengalaman sulit', serviceType: 'Pendampingan komplementer non-klinis', description: 'Percakapan reflektif yang menghormati batas dan kesiapan individu. Bukan terapi klinis, diagnosis, atau pengganti layanan kesehatan mental berizin.', provider: { '@id': ORG_ID }, areaServed: { '@type': 'City', name: 'Jakarta Selatan' } },
    PRACTITIONER_PERSON_SCHEMA,
  ],
}

/** Build BlogPosting only when the caller supplies the real published dates and article URL. */
export function createBlogPostingSchema({ url, headline, description, image, datePublished, dateModified }) {
  const required = { url, headline, description, image, datePublished, dateModified }
  for (const [key, value] of Object.entries(required)) {
    if (typeof value !== 'string' || value.trim() === '') throw new TypeError(`BlogPosting requires a non-empty ${key}.`)
  }
  if (Number.isNaN(Date.parse(datePublished)) || (dateModified && Number.isNaN(Date.parse(dateModified)))) {
    throw new TypeError('BlogPosting dates must be valid ISO 8601 dates. Use the real publication and update dates.')
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline,
    description,
    image: [image],
    datePublished,
    dateModified,
    author: PRACTITIONER_PERSON_SCHEMA,
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: `${SITE_URL}/`, logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/img/logos/logo-relungjiwa.svg` } },
    inLanguage: 'id-ID',
  }
}

export function getStructuredData(pathname) {
  const path = pathname.replace(/\/$/, '') || '/'
  const journalPrefix = '/jurnal/'
  if (path.startsWith(journalPrefix)) {
    const article = findPublishedArticle(decodeURIComponent(path.slice(journalPrefix.length)))
    if (!article) return null
    return createBlogPostingSchema({
      url: `${SITE_URL}/jurnal/${article.slug}/`,
      headline: article.headline,
      description: article.description,
      image: article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image}`,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
    })
  }
  const graph = pageGraph[path]
  return graph ? { '@context': 'https://schema.org', '@graph': path === '/' ? graph : [...siteGraph, ...graph] } : null
}

