import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const services = [
  { 
    title: 'Permasalahan Diri', 
    desc: 'Susah berhenti Merokok, Permasalahan diet/berat badan, Stress, Pain Management, Mental Block.',
    icon: '🧠',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    title: 'Emosi & Perasaan', 
    desc: 'Anxiety, Trauma Sulit Disembuhkan, Insomnia, Luka Batin, Over Thinking, Mengelola Stress',
    icon: '💙',
    color: 'from-purple-500 to-purple-600'
  },
  { 
    title: 'Perilaku Negatif', 
    desc: 'Suka Menunda, Mengeluh, Penyimpangan Seksual, Berbohong dan Suka Mencuri Motivasi',
    icon: '🔄',
    color: 'from-orange-500 to-orange-600'
  },
  { 
    title: 'Perilaku Anak & Remaja', 
    desc: 'Suka Berbohong, Tidak Percaya Diri, Tidak Memiliki Motivasi, Manja, Tidak Mau Makan Nasi Suka Mengompol',
    icon: '👶',
    color: 'from-green-500 to-green-600'
  },
  { 
    title: 'Psikomatis', 
    desc: 'Masalah kesehatan fisik yang dipengaruhi oleh kondisi mental dan emosional',
    icon: '🏥',
    color: 'from-red-500 to-red-600'
  },
  { 
    title: 'Masalah Keluarga', 
    desc: 'Konflik keluarga, komunikasi, dan hubungan interpersonal yang bermasalah',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-pink-500 to-pink-600'
  },
]

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full"
        whileHover={{ 
          scale: 1.05,
          y: -10
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon */}
        <motion.div
          className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-6`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          {service.icon}
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm">{service.desc}</p>

        {/* Checkmark */}
        <div className="mt-6 flex items-center gap-2">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm text-green-600 font-medium">Tersedia</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ServicesCarousel() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Layanan Hipnoterapi Kami
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Kami mempunyai layanan mencakup hipnoterapi untuk anak, remaja, dewasa, hingga lansia. 
            Setiap sesi dipersonalisasi sesuai kebutuhan individu, baik untuk manajemen stres, 
            peningkatan kepercayaan diri, mengatasi trauma, atau masalah perilaku.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Carousel for mobile */}
        <div className="lg:hidden">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            spaceBetween={20}
            navigation
            breakpoints={{
              320: { slidesPerView: 1.1 },
              640: { slidesPerView: 2.1 },
            }}
            className="services-swiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.title}>
                <ServiceCard service={service} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/layanan"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Semua Layanan
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}


