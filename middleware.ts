import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define arrays for public and private paths
  const publicPaths = ['/contact-us', '/about', '/privacy', '/terms-conditions', '/login', '/register', '/', '/restaurant/[slug]', '/search'];
  const privatePaths = ['/active-order', '/profile', '/user-settings', '/order-history'];

  if (
    path.startsWith('/_next') ||
    path.startsWith('/static/') ||
    path === '/favicon.ico' 
  ) {
    return NextResponse.next();
  }

  // Block access to /api routes
  if (path.startsWith('/api')) {
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');
    const currentUrl = process.env.NEXT_PUBLIC_API_URL as string;
    const currentHost = currentUrl.replace('https://', '').replace('http://', '').replace('://', '');

    // Allow requests from the same origin or if referer is from the same host
    if (referer?.startsWith(currentHost) || origin?.startsWith(currentHost) || request.headers.get('host')?.startsWith(currentHost)) {
      return NextResponse.next();
    } else {
      console.log("Access Denied")
      return new NextResponse('Access Denied', { status: 403 });
    }
  }


  // Get the token from the cookies
  const token = request.cookies.get('auth_token')?.value;

  // If the path is private or not public, and there's no token, redirect to login
  if (privatePaths.includes(path)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the path is login or register and there's a token, redirect to home
  if ((path === '/login' || path === '/register') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}


export const matcher = [
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  '/((?!api|_next/static|_next/image|favicon.ico).*)',
];
