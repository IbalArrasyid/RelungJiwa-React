import { useFAQs } from '../hooks/useFAQs'

export default function FAQ() {
  const faqs = useFAQs()

  return (
    <section className="section">
      <div className="container-max">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pertanyaan Umum</h1>
        <div className="mt-8 grid gap-4">
          {faqs === null ? (
            Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="card animate-pulse" aria-hidden="true">
                <div className="card-body space-y-3">
                  <div className="h-5 w-3/5 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-4/5 rounded bg-slate-100" />
                </div>
              </div>
            ))
          ) : faqs.length === 0 ? (
            <p className="text-sm text-slate-600">Belum ada pertanyaan yang tersedia.</p>
          ) : (
            faqs.map((faq) => (
              <div key={faq.id} className="card">
                <div className="card-body">
                  <p className="font-semibold text-slate-900">{faq.question}</p>
                  <p className="mt-1 text-sm text-slate-600">{faq.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}