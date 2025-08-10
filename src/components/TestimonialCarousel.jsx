import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Placeholder images; replace with WhatsApp screenshots later
const items = [
  {
    src: '/assets/img/curved-images/curved6.jpg',
    name: 'Sarah A.',
    testimonial: 'Setelah 3 sesi hipnoterapi, saya bisa tidur dengan nyenyak dan tidak lagi merasa cemas berlebihan.'
  },
  {
    src: '/assets/img/curved-images/curved8.jpg',
    name: 'Budi S.',
    testimonial: 'Berhasil mengatasi kebiasaan merokok yang sudah 10 tahun. Sekarang saya merasa lebih sehat dan berenergi.'
  },
  {
    src: '/assets/img/curved-images/curved14.jpg',
    name: 'Dewi K.',
    testimonial: 'Trauma masa lalu yang mengganggu sudah teratasi. Saya merasa bebas dan bisa menjalani hidup dengan normal.'
  },
]

function ImageModal({ isOpen, image, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={image.src} 
              alt="testimoni" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Testimonial info */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">{image.name}</h3>
              <p className="text-slate-700 text-sm">{image.testimonial}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TestimonialCard({ item, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <motion.div
          className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <img 
              src={item.src} 
              alt="testimoni" 
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-white/90 line-clamp-2">{item.testimonial}</p>
                <div className="mt-2 flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Click indicator */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <ImageModal 
        isOpen={isModalOpen} 
        image={item} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default function TestimonialCarousel() {
  return (
    <section className="py-20 bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Testimoni Klien
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Kesan dan pengalaman yang mereka rasakan setelah sesi hipnoterapi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {items.map((item, index) => (
            <TestimonialCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* Carousel for mobile */}
        <div className="lg:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1.1 },
              640: { slidesPerView: 2.1 },
            }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard item={item} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}


