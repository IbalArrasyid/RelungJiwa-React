import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"

function CountUp({ end, duration = 2 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        clearInterval(timer)
        setCount(end)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [end, duration])

  return count
}

function Stat({ number, suffix = "", label, delay = 0, isNumber = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="text-center bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-white/20 hover:shadow-xl hover:scale-105 transition-all"
    >
      <h3 className="text-4xl md:text-5xl font-extrabold text-blue-700">
        {isNumber ? <CountUp end={parseInt(number)} /> : number}
        {suffix}
      </h3>
      <p className="text-slate-700 font-medium mt-2">{label}</p>
    </motion.div>
  )
}

export default function Statistics() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Kepercayaan Klien Kami
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Lebih dari satu dekade membantu ribuan klien dengan kepuasan tinggi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <Stat number="10" suffix="+" label="Tahun Pengalaman" delay={0} />
          <Stat number="1000" suffix="+" label="Klien Ditangani" delay={0.2} />
          <Stat number="4.9" suffix="/5" label="Rata-rata Ulasan" delay={0.4} isNumber={false} />
        </div>
      </div>
    </section>
  )
}
