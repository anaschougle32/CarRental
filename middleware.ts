import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Allow access to login page
  if (req.nextUrl.pathname === '/adminlogin') {
    return NextResponse.next();
  }
  
  // Check if the user is authenticated for admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Check for admin cookie (set during login)
    const isLoggedIn = req.cookies.get('admin_session');
    
    if (!isLoggedIn) {
      // Redirect to login page
      const redirectUrl = new URL('/adminlogin', req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/adminlogin'],
}; 