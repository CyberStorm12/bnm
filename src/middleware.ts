import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole } from '@/types/auth';

const protectedRoutes = {
  [UserRole.CUSTOMER]: ['/customer', '/checkout'],
  [UserRole.VENDOR]: ['/vendor'],
  [UserRole.ADMIN]: ['/admin'],
};

const PUBLIC_EXACT_ROUTES = ['/login', '/register', '/cart', '/forgot-password'];
const PUBLIC_PREFIX_ROUTES = ['/shop', '/product', '/vendors', '/reset-password'];

function isPublicRoute(pathname: string): boolean {
  if (pathname === '/') return true;

  if (PUBLIC_EXACT_ROUTES.includes(pathname)) {
    return true;
  }

  return PUBLIC_PREFIX_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is public
  const isPublic = isPublicRoute(pathname);
  if (isPublic) {
    return NextResponse.next();
  }

  // Get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  const userRole = token.role as UserRole;
  const allowedRoutes = protectedRoutes[userRole] || [];

  const hasAccess = allowedRoutes.some((route) => pathname.startsWith(route));

  if (!hasAccess && !pathname.startsWith('/api')) {
    // Redirect based on role
    const redirectMap: Record<UserRole, string> = {
      [UserRole.CUSTOMER]: '/customer/account',
      [UserRole.VENDOR]: '/vendor/dashboard',
      [UserRole.ADMIN]: '/admin/dashboard',
    };
    return NextResponse.redirect(new URL(redirectMap[userRole] || '/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
