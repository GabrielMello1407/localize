import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const user = cookieStore.get('user');

  const protectedRoutes = [
    '/criar-evento',
    '/minha-conta',
    '/meus-ingressos',
    '/meus-eventos',
  ];

  const publicRoutes = ['/entrar', '/cadastrar'];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && (!token || !user)) {
    const url = new URL('/entrar', request.url);
    url.searchParams.set('unauthorized', 'true');
    return NextResponse.redirect(url);
  }

  if (isPublicRoute && token && user) {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/criar-evento/:path*',
    '/minha-conta/:path*',
    '/meus-ingressos/:path*',
    '/meus-eventos/:path*',
    '/entrar/:path*',
    '/cadastrar/:path*',
  ],
};
