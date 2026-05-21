const dishes = [
  {
    name: "Salade Palm d'Or",
    desc: "Laitue, avocat, ananas, mangue, thon, crevettes, calamar",
    price: "80 DH",
  },
  {
    name: "Friture de poisson",
    desc: "Calamar, sole, crevettes grises — frit maison",
    price: "65 DH",
  },
  {
    name: "Brochettes de poulet",
    desc: "Marinées aux épices, grillées à la plancha",
    price: "65 DH",
  },
  {
    name: "Sole grillée",
    desc: "Poisson frais du jour, à la plancha",
    price: "95 DH",
  },
  {
    name: "Paella",
    desc: "Riz, fruits de mer, épices — cuisiné à la demande",
    price: "70 DH",
  },
]

export default function MenuSection() {
  return (
    <section id="menu" className="bg-palm-cream-dark py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <p className="text-[9px] tracking-[0.5em] uppercase text-palm-gold font-medium">
            Notre carte
          </p>
          <h2 className="font-display font-light italic text-3xl md:text-4xl text-palm-blue">
            Menu Palm d&apos;Or
          </h2>
          <div className="w-10 h-px bg-palm-gold/60" />
        </div>

        {/* Dish list */}
        <div className="flex flex-col">
          {dishes.map((dish, i) => (
            <div
              key={dish.name}
              className={`flex items-baseline justify-between gap-6 py-4
                ${i < dishes.length - 1 ? 'border-b border-palm-gold/15' : ''}`}
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-palm-blue leading-snug">
                  {dish.name}
                </span>
                <span className="text-[11px] text-palm-blue/45 leading-relaxed">
                  {dish.desc}
                </span>
              </div>
              <span className="shrink-0 text-sm font-medium text-palm-gold tabular-nums">
                {dish.price}
              </span>
            </div>
          ))}
        </div>

        {/* Réserver */}
        <div className="flex justify-center mt-10">
          <a
            href="#contact"
            className="text-[10px] tracking-[0.18em] uppercase text-palm-blue/40
              hover:text-palm-blue/70 transition-colors duration-200"
          >
            Réserver une table ↓
          </a>
        </div>

      </div>
    </section>
  )
}
