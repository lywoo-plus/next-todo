import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/sign-in', '/sign-up'];

export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);

  const session = req.cookies.get('better-auth.session_token');

  if (!session) {
    // Allow visiting only sign-in and sign-up pages
    const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

    if (!isPublic) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
  }

  // If authenticated and trying to access sign-in/up, redirect to home (or dashboard)
  const isAuthPage = PUBLIC_PATHS.includes(pathname);
  if (isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Apply to all routes except Next.js internals; keep broad but efficient
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
