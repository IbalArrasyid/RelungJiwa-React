import { motion } from 'framer-motion'
import { ShieldCheck, BadgeCheck, Lock, Clock } from 'lucide-react'

const items = [
  { icon: ShieldCheck, title: 'Bersertifikat', desc: 'Ditangani praktisi berpengalaman lebih dari 10 tahun.' },
  { icon: Lock, title: 'Privasi Terjaga', desc: 'Kerahasiaan dan kenyamanan Anda adalah prioritas.' },
  { icon: BadgeCheck, title: 'Berbasis Bukti', desc: 'Teknik yang aman dan mengikuti praktik etis.' },
  { icon: Clock, title: 'Fleksibel', desc: 'Sesi online & tatap muka sesuai kebutuhan Anda.' },
]

export default function WhyUs() {
  return (
    <section className="section bg-gradient-to-b from-white to-brand-50/30">
      <div className="container-max">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Mengapa memilih Relung Jiwa</h2>
        <p className="mt-2 text-slate-600 max-w-3xl">Desain layanan kami fokus pada kepercayaan, kenyamanan, dan hasil yang realistis.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="card-body">
                <div className="h-11 w-11 rounded-xl bg-white border border-brand-200 text-brand-700 flex items-center justify-center shadow-sm">
                  <it.icon size={22} />
                </div>
                <p className="mt-3 font-semibold text-slate-900">{it.title}</p>
                <p className="mt-1 text-sm text-slate-600">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


