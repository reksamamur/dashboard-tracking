import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith('/')) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
