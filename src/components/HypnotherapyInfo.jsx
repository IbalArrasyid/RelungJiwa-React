import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function ResearchStat({ percentage, method, sessions, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <motion.div
        className="text-center"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-3xl font-bold text-blue-600 mb-2">{percentage}</div>
        <div className="text-lg font-semibold text-slate-800 mb-1">{method}</div>
        <div className="text-sm text-slate-600">{sessions}</div>
      </motion.div>
    </motion.div>
  )
}

export default function HypnotherapyInfo() {
  return (
    <section className="py-20 bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* What is Hypnotherapy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Apa itu Hipnoterapi?
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Hipnoterapi adalah teknik terapi yang menggunakan hipnosis untuk mengakses pikiran bawah sadar 
              dan membantu mengatasi berbagai masalah mental dan emosional. Melalui relaksasi mendalam, 
              klien dapat mengakses memori dan pola pikir yang tersembunyi untuk perubahan positif.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Berbeda dengan terapi konvensional, hipnoterapi bekerja langsung dengan pikiran bawah sadar 
              untuk mengidentifikasi akar masalah dan menciptakan perubahan yang lebih cepat dan efektif.
            </p>
            
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-l-4 border-blue-500"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Keunggulan Hipnoterapi
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Proses penyembuhan yang lebih cepat
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Mengatasi akar masalah secara mendalam
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Aman dan tanpa efek samping
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Dapat diterapkan untuk berbagai masalah
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Research Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">
                Riset Tentang Efektivitas Hipnoterapi
              </h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Menurut penelitian yang dipublikasikan oleh American Health Magazine (Barrios, A.A., 1970), 
                hipnoterapi telah terbukti lebih efektif daripada metode terapi lainnya:
              </p>
              
              <div className="space-y-4 mb-8">
                <ResearchStat 
                  percentage="93%" 
                  method="Hipnoterapi" 
                  sessions="6 sesi" 
                  delay={0}
                />
                <ResearchStat 
                  percentage="72%" 
                  method="Terapi Perilaku" 
                  sessions="22 sesi" 
                  delay={0.2}
                />
                <ResearchStat 
                  percentage="38%" 
                  method="Psikoanalisis" 
                  sessions="600 sesi" 
                  delay={0.4}
                />
              </div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg font-medium">
                  Dengan angka keberhasilan yang tinggi, hipnoterapi menjadi pilihan yang cepat dan efektif 
                  untuk menangani berbagai masalah emosional dan mental.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
