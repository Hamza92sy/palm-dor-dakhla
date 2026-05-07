// Server-side env validation — imported by API routes on first call
// Throws with a clear message instead of a cryptic "invalid URL" crash

const REQUIRED_SERVER = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_WHATSAPP_NUMBER',
] as const

export function assertServerEnv() {
  const missing = REQUIRED_SERVER.filter(
    key => !process.env[key]
  )
  if (missing.length > 0) {
    throw new Error(
      `[env] Variables d'environnement manquantes sur Vercel : ${missing.join(', ')}\n` +
      'Configurer dans Vercel Dashboard → Settings → Environment Variables.'
    )
  }
}
