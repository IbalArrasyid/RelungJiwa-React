import { motion, useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'

import { useTestimonials } from '../hooks/useTestimonials'

const loadingCards = [0, 1, 2]

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function CmsTestimonialSection() {
  const testimonials = useTestimonials()

  if (testimonials !== null && testimonials.length === 0) {
    return null
  }

  return (
    <section className="section bg-surface">
      <div className="container-max">
        <Reveal className="max-w-2xl text-center mx-auto">
          <p className="eyebrow">Suara dari ruang ini</p>
          <h2 className="section-title mt-4">Kesan yang dibawa pulang peserta</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3" aria-busy={testimonials === null}>
          {testimonials === null
            ? loadingCards.map((card) => (
                <div key={card} className="min-h-[208px] rounded-xl bg-surface-container animate-pulse" aria-hidden="true" />
              ))
            : testimonials.map((testimonial, index) => (
                <Reveal
                  key={testimonial.id}
                  delay={index * 0.08}
                  className="editorial-card flex min-h-[280px] flex-col p-7"
                >
                  <Quote className="text-cocoa" size={28} />
                  <blockquote className="mt-6 font-serif text-xl leading-relaxed text-espresso">
                    {testimonial.quote}
                  </blockquote>
                  <p className="mt-auto pt-7 text-sm font-medium text-cocoa">— {testimonial.context}</p>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  )
}
