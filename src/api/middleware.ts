import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token, redirect to the login page
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Optional: Check token expiration (if supported in your setup)
  const isExpired = token?.exp && Date.now() / 1000 > Number(token.exp);
  if (isExpired) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Token is valid, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ['/backoffice/:path*', '/superadmin/:path*'], // Apply middleware to the dashboard and subpaths
};
