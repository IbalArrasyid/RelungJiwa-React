import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import Statistics from '../components/Statistics'
import HypnotherapyInfo from '../components/HypnotherapyInfo'
import Problems from '../components/Problems'
import HypnotherapyProcess from '../components/HypnotherapyProcess'
import ServicesCarousel from '../components/ServicesCarousel'
import TestimonialCarousel from '../components/TestimonialCarousel'
import BlogSection from '../components/BlogSection'
import CTA from '../components/CTA'
import WhatsAppFAB from '../components/WhatsAppFAB'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Statistics />
      <HypnotherapyInfo />
      <Problems />
      <HypnotherapyProcess />
      <ServicesCarousel />
      <TestimonialCarousel />
      <BlogSection />
      <CTA />
      <WhatsAppFAB />
    </>
  )
}

function Stat({ number, label }) {
  return (
    <div className="card">
      <div className="card-body">
        <p className="text-2xl font-bold text-slate-900">{number}</p>
        <p className="text-sm text-slate-600">{label}</p>
      </div>
    </div>
  )
}

function Feature({ title, desc }) {
  return (
    <div className="card">
      <div className="card-body">
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  )
}

function ServiceCard({ title, desc }) {
  return (
    <div className="card">
      <div className="card-body">
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  )
}


