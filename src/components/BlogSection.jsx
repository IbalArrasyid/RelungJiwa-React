import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const blogPosts = [
  {
    id: 1,
    title: "Mengatasi Insomnia dengan Hipnoterapi",
    excerpt: "Teknik hipnoterapi yang efektif untuk mengatasi masalah tidur dan insomnia kronis.",
    image: "/assets/img/curved-images/curved5.jpg",
    category: "Kesehatan Mental",
    date: "2024-01-15",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "Hipnoterapi untuk Mengatasi Trauma",
    excerpt: "Bagaimana hipnoterapi dapat membantu mengatasi trauma masa lalu secara aman dan efektif.",
    image: "/assets/img/curved-images/curved11.jpg",
    category: "Trauma Healing",
    date: "2024-01-12",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Manajemen Stres di Era Digital",
    excerpt: "Tips dan teknik hipnoterapi untuk mengelola stres dalam kehidupan modern yang serba cepat.",
    image: "/assets/img/curved-images/curved6.jpg",
    category: "Stress Management",
    date: "2024-01-10",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Hipnoterapi untuk Anak dan Remaja",
    excerpt: "Panduan lengkap tentang hipnoterapi yang aman dan efektif untuk anak-anak dan remaja.",
    image: "/assets/img/curved-images/curved8.jpg",
    category: "Anak & Remaja",
    date: "2024-01-08",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "Menghentikan Kebiasaan Merokok",
    excerpt: "Sukses story klien yang berhasil menghentikan kebiasaan merokok melalui hipnoterapi.",
    image: "/assets/img/curved-images/curved14.jpg",
    category: "Kebiasaan",
    date: "2024-01-05",
    readTime: "4 min read"
  },
  {
    id: 6,
    title: "Kecemasan Sosial dan Hipnoterapi",
    excerpt: "Solusi efektif untuk mengatasi kecemasan sosial dan meningkatkan kepercayaan diri.",
    image: "/assets/img/curved-images/curved10.jpg",
    category: "Kecemasan",
    date: "2024-01-03",
    readTime: "6 min read"
  }
]

function BlogCard({ post, index, featured = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group ${featured ? 'lg:col-span-2' : ''}`}
    >
      <motion.div
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-48 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
            <span>{new Date(post.date).toLocaleDateString('id-ID', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h3 className={`font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
            {post.title}
          </h3>

          <p className="text-slate-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <Link 
            to={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Baca Selengkapnya
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function BlogSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Artikel Terbaru
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Temukan tips, panduan, dan informasi terbaru seputar hipnoterapi dan kesehatan mental
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              index={index}
              featured={post.featured}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.a
            href="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Semua Artikel
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
