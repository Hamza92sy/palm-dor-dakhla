import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corps invalide' }, { status: 400 })
  }

  const { password } = body
  const secret = process.env.ADMIN_SECRET

  if (!secret) {
    return NextResponse.json(
      { error: 'ADMIN_SECRET non configuré — ajouter la variable sur Vercel' },
      { status: 500 }
    )
  }

  if (typeof password !== 'string' || password !== secret) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_token', secret, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge:   60 * 60 * 24 * 7, // 7 jours
    path:     '/',
  })
  return res
}
