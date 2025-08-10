import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  {
    heading: 'Pulihkan kendali diri',
    text: 'Bangun rasa aman baru dan kembali tenang menghadapi keseharian.',
    image: '/assets/img/banner/slide-1-desktop.webp'
  },
  {
    heading: 'Tidur lebih berkualitas',
    text: 'Restrukturisasi pola tidur dan relaksasi terarah untuk insomnia.',
    image: '/assets/img/curved-images/curved5.jpg'
  },
  {
    heading: 'Atasi kecemasan & stres',
    text: 'Latihan regulasi emosi yang mudah diterapkan setiap hari.',
    image: '/assets/img/curved-images/curved11.jpg'
  },
]

export default function HeroSlider() {
  return (
    <section className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.heading}>
            <div
              className="w-full h-screen bg-cover bg-center relative flex items-center"
              style={{ backgroundImage: `url(${s.image})` }}
            >
              {/* Overlay gelap supaya teks lebih terbaca */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Konten */}
              <div className="relative z-10 max-w-4xl px-6 sm:px-10 lg:px-16 text-white">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/30"
                >
                  Relung Jiwa
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-6 text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
                >
                  {s.heading}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="mt-6 text-xl text-blue-100 max-w-prose leading-relaxed"
                >
                  {s.text}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  className="mt-8 flex gap-4 flex-wrap"
                >
                  <motion.a 
                    href="https://wa.me/6281351780173" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-green-500 text-white hover:bg-green-600 h-12 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                      <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.657.804 5.134 2.188 7.188L4 29l7.062-2.157C13.042 28.378 14.489 29 16.001 29c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm6.469 17.422c-.273.771-1.582 1.484-2.195 1.582-.561.09-1.293.127-2.09-.127-.48-.152-1.1-.357-1.9-.7-3.34-1.456-5.52-4.854-5.69-5.083-.164-.228-1.358-1.807-1.358-3.448 0-1.64.86-2.446 1.168-2.785.307-.339.668-.424.89-.424.222 0 .445.003.64.012.205.009.48-.078.75.57.273.66.928 2.28 1.012 2.446.083.165.138.358.025.586-.11.228-.166.357-.33.548-.165.191-.349.428-.497.575-.165.164-.338.345-.145.676.194.339.86 1.42 1.85 2.303 1.272 1.14 2.34 1.49 2.68 1.655.34.165.54.139.743-.083.202-.222.856-1 1.085-1.34.228-.34.456-.285.75-.165.294.12 1.868.88 2.188 1.04.32.165.53.24.607.375.076.136.076.782-.197 1.553z"/>
                    </svg>
                    Konsultasi Gratis
                  </motion.a>

                  <motion.a 
                    href="/layanan" 
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 h-12 px-6 rounded-xl font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Jelajahi Layanan
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
