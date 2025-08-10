import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const processSteps = [
  {
    step: 1,
    title: "Proses Konseling",
    description: "Konsultasi awal untuk memahami masalah dan kebutuhan klien secara mendalam",
    icon: "💬",
    color: "from-blue-500 to-blue-600"
  },
  {
    step: 2,
    title: "Persetujuan Klien",
    description: "Penjelasan lengkap tentang proses hipnoterapi dan persetujuan klien",
    icon: "✅",
    color: "from-green-500 to-green-600"
  },
  {
    step: 3,
    title: "Induksi Hipnosis",
    description: "Proses relaksasi mendalam untuk memasuki kondisi hipnosis",
    icon: "🧘",
    color: "from-purple-500 to-purple-600"
  },
  {
    step: 4,
    title: "Proses Hipnoterapi",
    description: "Terapi langsung dengan pikiran bawah sadar untuk perubahan positif",
    icon: "✨",
    color: "from-orange-500 to-orange-600"
  }
]

function ProcessStep({ step, title, description, icon, color, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
        whileHover={{ 
          scale: 1.05,
          y: -10
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Step number */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {step}
        </div>

        {/* Icon */}
        <motion.div
          className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
          <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>

        {/* Connecting line */}
        {step < 4 && (
          <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent transform -translate-y-1/2"></div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function HypnotherapyProcess() {
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
            Alur Proses Hipnoterapi
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Proses hipnoterapi yang terstruktur dan aman untuk hasil yang optimal
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 relative">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.step}
              {...step}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full opacity-30"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-24 h-24 bg-orange-100 rounded-full opacity-30"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  )
}
