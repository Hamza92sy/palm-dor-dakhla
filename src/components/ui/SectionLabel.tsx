export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.4em] uppercase text-palm-gold font-medium">
      {children}
    </p>
  )
}
