export interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FAQItem[]
}

export default function FAQSection({ items }: FAQSectionProps) {
  return (
    <section className="bg-palm-cream py-16 md:py-24 border-t border-palm-gold/15">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">

        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <p className="text-[9px] tracking-[0.5em] uppercase text-palm-gold font-medium">
            Questions fréquentes
          </p>
          <h2 className="font-display font-light italic text-3xl md:text-4xl text-palm-blue">
            Tout ce que vous voulez savoir
          </h2>
          <div className="w-8 h-px bg-palm-gold/50 mt-1" />
        </div>

        <div className="divide-y divide-palm-gold/15">
          {items.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none">
                <h3 className="text-sm md:text-base font-medium text-palm-blue leading-relaxed">
                  {item.question}
                </h3>
                <span
                  className="shrink-0 mt-0.5 text-palm-gold/70 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 text-sm text-palm-blue/65 leading-7 max-w-[65ch]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

      </div>
    </section>
  )
}
