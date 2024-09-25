import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  // console.log(request);
  
  const path = request.nextUrl.pathname;

  // Define an array of public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/about', '/'];

  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));

  // Get the token from the cookies
  const token = request.cookies.get('auth_token')?.value;

  // If the path is not public and there's no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the path is login or register and there's a token, redirect to home
  if ((path === '/login' || path === '/register' || path === '/') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.rewrite(request.nextUrl);
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
