import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { getStructuredData } from './src/seo/structuredData.js'
import { findPublishedArticle, PUBLISHED_ARTICLES } from './src/data/publishedArticles.js'

const prerenderedRoutes = [
  { path: '/', fileName: 'index.html' },
  { path: '/layanan', fileName: 'layanan/index.html' },
  { path: '/kontak', fileName: 'kontak/index.html' },
  { path: '/profil-praktisi', fileName: 'profil-praktisi/index.html' },
  { path: '/layanan/hipnoterapi-kecemasan', fileName: 'layanan/hipnoterapi-kecemasan/index.html' },
  { path: '/layanan/trauma-healing', fileName: 'layanan/trauma-healing/index.html' },
  ...PUBLISHED_ARTICLES.map(({ slug }) => ({ path: `/jurnal/${slug}`, fileName: `jurnal/${slug}/index.html` })),
]

const routeMetadata = {
  '/': {
    title: 'Relung Jiwa | Layanan Konseling dan Kesehatan Mental',
    description: 'Relung Jiwa adalah ruang untuk memahami diri, mengenali emosi, dan mendapatkan pendampingan konseling dalam perjalanan kesehatan mental.',
  },
  '/layanan': {
    title: 'Layanan Hipnoterapi & Konseling | Relung Jiwa',
    description: 'Pelajari layanan hipnoterapi dan pendampingan reflektif non-klinis Relung Jiwa di Jakarta Selatan.',
  },
  '/kontak': {
    title: 'Kontak & Pertanyaan Umum | Relung Jiwa',
    description: 'Hubungi Relung Jiwa dan temukan jawaban tentang sesi orientasi, privasi, dan layanan pendampingan.',
  },
  '/profil-praktisi': { title: 'Dewi Kartini | Profil Praktisi Hipnoterapi - Relung Jiwa', description: 'Profil dan daftar sertifikat serta pelatihan Dewi Kartini di Relung Jiwa.' },
  '/layanan/hipnoterapi-kecemasan': { title: 'Hipnoterapi Kecemasan Non-Klinis | Relung Jiwa Jakarta Selatan', description: 'Informasi dukungan komplementer non-klinis terkait kecemasan melalui relaksasi terarah dan refleksi.' },
  '/layanan/trauma-healing': { title: 'Pendampingan Reflektif Pasca Pengalaman Sulit | Relung Jiwa', description: 'Ruang reflektif komplementer non-klinis yang menghormati batas dan kesiapan Anda.' },
}

function jsonLdTag(path) {
  const schema = getStructuredData(path)
  if (!schema) return ''
  const json = JSON.stringify(schema).replace(/</g, '\\u003c')
  return `<script id="relungjiwa-jsonld" type="application/ld+json">${json}</script>`
}

function withJsonLd(html, path) {
  const cleaned = html.replace(/\s*<script id="relungjiwa-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
  const tag = jsonLdTag(path)
  const normalizedPath = path.replace(/\/$/, '') || '/'
  const articleSlug = normalizedPath.startsWith('/jurnal/') ? normalizedPath.slice('/jurnal/'.length) : null
  const article = articleSlug ? findPublishedArticle(articleSlug) : null
  const metadata = routeMetadata[normalizedPath] || (article ? { title: `${article.headline} | Jurnal Relung Jiwa`, description: article.description } : null)
  const canonical = `https://relungjiwa.site${normalizedPath === '/' ? '/' : `${normalizedPath}/`}`
  let htmlWithMetadata = cleaned
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
  if (metadata) {
    htmlWithMetadata = htmlWithMetadata
      .replace(/<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`)
      .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${metadata.description}" />`)
  }
  return tag ? htmlWithMetadata.replace('</head>', `  ${tag}\n  </head>`) : htmlWithMetadata
}

function structuredDataPrerender() {
  return {
    name: 'relungjiwa-structured-data-prerender',
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        const pathname = (context.path || '/').split('?')[0].replace(/\/index\.html$/, '/')
        return withJsonLd(html, pathname)
      },
    },
    async writeBundle(options, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') return
      const baseHtml = String(index.source)
      for (const route of prerenderedRoutes.filter(({ path }) => path !== '/')) {
        const outputPath = resolve(options.dir || 'dist', route.fileName)
        await mkdir(dirname(outputPath), { recursive: true })
        await writeFile(outputPath, withJsonLd(baseHtml, route.path), 'utf8')
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), structuredDataPrerender()],
})


