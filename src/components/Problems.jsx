import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

const problems = [
  'Minder', 'Trauma', 'Kecemasan', 'Depresi', 'Stres', 'Kecanduan Merokok', 'Ejakulasi Dini',
  'Emosional', 'Phobia', 'Lesbian', 'Masalah Keluarga', 'Kecanduan Pornografi', 'Takut Ketinggian', 'Kesedihan'
]

export default function Problems() {
  return (
    <section className="section">
      <div className="container-max grid lg:grid-cols-2 gap-10 items-start">
        <div className="rounded-2xl overflow-hidden border border-slate-200">
          <img src="/assets/img/meeting.jpg" alt="illustration" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Kami membantu menyelesaikan beragam persoalan</h2>
          <p className="mt-2 text-slate-600">Dengan pendekatan yang aman dan terstruktur, kami mendampingi proses pemulihan Anda.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {problems.map((p, idx) => (
              <motion.div key={p}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 p-3 shadow-sm"
              >
                <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertCircle size={18} />
                </div>
                <span className="text-slate-700 text-sm">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


