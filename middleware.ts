import { NextRequest, NextResponse } from 'next/server'

// Paths that bypass auth check
const EXCLUDED = ['/admin/login', '/api/admin/auth']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (EXCLUDED.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const token  = req.cookies.get('admin_token')?.value
  const secret = process.env.ADMIN_SECRET

  if (!secret || !token || token !== secret) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
