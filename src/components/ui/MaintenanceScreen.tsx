export default function MaintenanceScreen() {
  return (
    <section className="min-h-[calc(100svh-5rem)] bg-palm-cream px-5 py-12 sm:px-8 md:min-h-[calc(100svh-6rem)] md:py-16">
      <div className="mx-auto flex min-h-[calc(100svh-11rem)] w-full max-w-5xl items-center md:min-h-[calc(100svh-14rem)]">
        <div className="w-full border-y border-palm-gold/25 py-12 sm:py-16 md:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.26em] text-palm-gold">
              Palm d&apos;Or Dakhla
            </p>
            <h1 className="font-display text-4xl font-light italic leading-tight text-palm-blue sm:text-5xl md:text-7xl">
              Maintenance en cours
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-palm-blue/75 sm:text-lg">
              Palm d&apos;Or Dakhla est actuellement en maintenance et reprend bientôt.
            </p>
            <div className="mt-10 h-px w-20 bg-palm-gold" />
            <p className="mt-8 max-w-xl text-sm leading-7 text-palm-blue/60">
              Merci pour votre patience. L&apos;accès public revient très prochainement.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
