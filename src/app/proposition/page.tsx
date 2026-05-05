"use client";

/* ─── Static data ────────────────────────────────────── */

const CONTENT: string[] = [
  "Site complet (6 pages)",
  "Version français et anglais",
  "Design moderne et élégant",
  "Compatible mobile, tablette et ordinateur",
  "Réservation simple via WhatsApp",
  "Galerie photo",
  "Page contact avec Google Maps",
  "Optimisation de base pour Google",
];

const SETUP: string[] = [
  "Nom de domaine : palmdordakhla.com",
  "Email : contact@palmdordakhla.com",
  "Email : reservation@palmdordakhla.com",
  "Mise en ligne complète du site",
];

/* ─── Page ───────────────────────────────────────────── */

export default function PropositionPage() {
  return (
    <>
      {/* ── Print CSS ─────────────────────────────────── */}
      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          main { padding: 0 !important; }
          body { background: white !important; }
          @page { size: A4; margin: 0; }
          .doc { box-shadow: none !important; }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* ── Screen wrapper ────────────────────────────── */}
      <div className="no-print-wrapper min-h-screen bg-[#E8DDD0] py-8 px-4 flex flex-col items-center print:block print:py-0 print:bg-white">

        {/* ═══════════════════════════════════════════
            DOCUMENT CARD  (max 794 px = A4 width)
        ═══════════════════════════════════════════ */}
        <div className="doc w-full max-w-[794px] bg-white shadow-[0_10px_56px_rgba(0,0,0,0.14)]">

          {/* ── HEADER ──────────────────────────────── */}
          <header className="bg-[#18364F] px-10 py-[26px]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(184,146,46,0.07) 1px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          >
            {/* Document label */}
            <p className="text-[#B8922E] text-[9px] tracking-[0.55em] uppercase text-center mb-[18px]">
              Devis &nbsp;/&nbsp; Proposition
            </p>

            {/* Client name  |  Ref + Date */}
            <div className="flex items-end justify-between">
              <div>
                <p
                  className="text-white text-[26px] font-light leading-tight"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Palm d&rsquo;Or Dakhla
                </p>
                <p className="text-white/45 text-[11px] mt-[5px] tracking-wide">
                  Projet : Site web premium
                </p>
              </div>
              <div className="text-right space-y-[4px]">
                <p className="text-white/50 text-[11px]">
                  N° Devis : <span className="text-white/85">PD-2026-01</span>
                </p>
                <p className="text-white/50 text-[11px]">
                  Date : <span className="text-white/85">14 Avril 2026</span>
                </p>
              </div>
            </div>
          </header>

          {/* ── BODY ────────────────────────────────── */}
          <div className="px-10 py-[26px] space-y-[18px]">

            {/* ① PRESTATAIRE + CLIENT ─────────────── */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <Cap>Prestataire</Cap>
                <Name>Hamza Saidou</Name>
                <p className="text-[#18364F]/55 text-[11px] mt-[3px]">
                  Développeur Web &nbsp;—&nbsp; Next.js
                </p>
                <p className="text-[#18364F]/40 text-[11px] mt-[8px]">
                  hamzasaidousy@outlook.fr
                </p>
              </div>
              <div>
                <Cap>Client</Cap>
                <Name>Palm d&rsquo;Or Dakhla</Name>
                <p className="text-[#18364F]/55 text-[11px] mt-[3px]">
                  Restaurant &nbsp;·&nbsp; Café &nbsp;·&nbsp; Hébergements
                </p>
                <p className="text-[#18364F]/40 text-[11px] mt-[8px]">
                  Dakhla, Maroc
                </p>
              </div>
            </div>

            <Rule />

            {/* ② OBJET ────────────────────────────── */}
            <div>
              <Cap>Objet du projet</Cap>
              <p className="text-[#18364F] text-[12px] leading-relaxed mt-[6px]">
                Création d&rsquo;un site web moderne et professionnel pour présenter le
                restaurant, le café et les hébergements de Palm d&rsquo;Or Dakhla.
              </p>
              <p className="text-[#18364F]/50 text-[11px] mt-[5px]">
                Objectif : attirer des clients et faciliter les réservations via WhatsApp.
              </p>
            </div>

            {/* ③ CONTENU ──────────────────────────── */}
            <div>
              <Cap>Contenu du site</Cap>
              <div className="mt-[10px] grid grid-cols-2 gap-x-8 gap-y-[7px]">
                {CONTENT.map((item) => (
                  <div key={item} className="flex items-baseline gap-2">
                    <span className="text-[#B8922E] text-[11px] leading-none shrink-0 select-none">
                      —
                    </span>
                    <p className="text-[#18364F] text-[11.5px] leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ④ SETUP (highlighted) ──────────────── */}
            <div className="border-l-[3px] border-[#B8922E] bg-[#F5EFE6] pl-5 pr-6 py-[14px]">
              <Cap>Inclus dans la prestation</Cap>
              <div className="mt-[10px] space-y-[7px]">
                {SETUP.map((item) => (
                  <div key={item} className="flex items-baseline gap-2">
                    <span className="text-[#B8922E] text-[11px] leading-none shrink-0 select-none">
                      —
                    </span>
                    <p className="text-[#18364F] text-[11.5px]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <Rule />

            {/* ⑤ DÉLAI + PAIEMENT ─────────────────── */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <Cap>Délai de livraison</Cap>
                <p
                  className="text-[#18364F] text-[26px] font-light mt-[6px] leading-none"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  7 jours
                </p>
              </div>
              <div>
                <Cap>Conditions de paiement</Cap>
                <p className="text-[#18364F] text-[12px] mt-[6px] leading-relaxed">
                  Paiement à la livraison après validation finale.
                </p>
                <p className="text-[#18364F]/45 text-[11px] mt-[4px] leading-snug">
                  Des aperçus du site seront partagés pendant le développement.
                </p>
              </div>
            </div>

            <Rule />

            {/* ⑥ MONTANT TOTAL (invoice style) ────── */}
            <div className="flex justify-between items-baseline">
              <p className="text-[#18364F]/60 text-[12px] tracking-wide">Total du projet</p>
              <p className="text-[#18364F] text-[13px] font-light tracking-tight">12&thinsp;000 MAD</p>
            </div>

            <Rule />

            {/* ⑦ SIGNATURES ───────────────────────── */}
            <div className="grid grid-cols-2 gap-5">
              {/* Prestataire */}
              <div>
                <Cap>Prestataire</Cap>
                <p className="text-[#18364F] text-[12.5px] font-semibold mt-[6px]">
                  Hamza Saidou
                </p>
                <p className="text-[#18364F]/40 text-[10px] mt-[2px]">
                  hamzasaidousy@outlook.fr
                </p>
                <div className="mt-[22px] border-b border-[#18364F]/20" />
                <p className="text-[#18364F]/30 text-[9px] mt-[4px] tracking-[0.25em] uppercase">
                  Signature &amp; date
                </p>
              </div>

              {/* Client */}
              <div>
                <Cap>Client</Cap>
                <p className="text-[#18364F] text-[12.5px] font-semibold mt-[6px]">
                  Palm d&rsquo;Or Dakhla
                </p>
                <p className="text-[#18364F]/40 text-[10px] mt-[2px]">
                  Bon pour accord
                </p>
                <div className="mt-[22px] border-b border-[#18364F]/20" />
                <p className="text-[#18364F]/30 text-[9px] mt-[4px] tracking-[0.25em] uppercase">
                  Signature &amp; date
                </p>
              </div>
            </div>

          </div>{/* /body */}

          {/* ── BOTTOM ACCENT ───────────────────────── */}
          <div className="h-[3px] bg-gradient-to-r from-[#18364F] via-[#B8922E] to-[#18364F]" />

        </div>{/* /doc */}

        {/* ── PRINT BUTTON (screen only) ──────────── */}
        <div className="no-print mt-5 flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-[#18364F] text-white text-[11px] px-5 py-[10px] hover:bg-[#264E6E] transition-colors tracking-[0.2em] uppercase"
          >
            <span className="text-[#B8922E] text-sm">↓</span>
            Télécharger PDF
          </button>
          <p className="text-[#18364F]/35 text-[11px]">Format A4 · Prêt à imprimer</p>
        </div>

      </div>
    </>
  );
}

/* ─── Micro-components ───────────────────────────────── */

/** Gold uppercase caption label */
function Cap({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <p
      className={`text-[#B8922E] text-[9px] tracking-[0.45em] uppercase${center ? " text-center" : ""}`}
    >
      {children}
    </p>
  );
}

/** Serif name text */
function Name({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[#18364F] text-[17px] font-light mt-[4px] leading-tight"
      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
    >
      {children}
    </p>
  );
}

/** Thin ornamental rule */
function Rule() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-[#DDD4C4]" />
      <div className="w-[5px] h-[5px] rotate-45 bg-[#B8922E]/35 shrink-0" />
      <div className="flex-1 h-px bg-[#DDD4C4]" />
    </div>
  );
}
