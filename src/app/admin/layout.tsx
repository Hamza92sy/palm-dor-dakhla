export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        Hide the public Navbar and Footer injected by root layout.
        The admin shell provides its own header (title + logout button).
        This avoids touching root layout or restructuring route groups.
      */}
      <style>{`
        body > header,
        body > footer { display: none !important; }
        body > main   { padding-top: 0 !important; }
      `}</style>
      {children}
    </>
  )
}
