import { Link, useParams } from 'react-router-dom'
import { findPublishedArticle } from '../data/publishedArticles'

export default function JournalArticle() {
  const { slug } = useParams()
  const article = findPublishedArticle(slug)

  if (!article) return <main className="container-max py-20"><p className="eyebrow">Jurnal Relung Jiwa</p><h1 className="page-title mt-4">Artikel belum tersedia</h1><p className="mt-4 text-espresso/65">Artikel ini belum diterbitkan atau slug-nya tidak ditemukan.</p><Link to="/jurnal" className="btn btn-quiet mt-7">Kembali ke jurnal</Link></main>

  return <main className="container-max max-w-4xl py-12 sm:py-20">
    <article>
      <p className="eyebrow">Jurnal Relung Jiwa · {new Date(article.datePublished).toLocaleDateString('id-ID')}</p>
      <h1 className="page-title mt-4">{article.headline}</h1>
      <p className="mt-5 text-lg leading-8 text-espresso/70">{article.description}</p>
      <p className="mt-4 text-sm text-espresso/55">Oleh Dewi Kartini</p>
      <img src={article.image} alt={article.imageAlt || article.headline} className="mt-8 aspect-[16/9] w-full rounded-xl object-cover" />
      <div className="prose prose-stone mt-9 max-w-none">{article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      <p className="mt-10 rounded-xl bg-soft-blue/50 p-5 text-sm leading-6 text-espresso/70">Layanan Relung Jiwa bersifat komplementer/non-klinis dan bukan pengganti diagnosis atau perawatan dari tenaga kesehatan berizin.</p>
    </article>
  </main>
}
