import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'

const requireAuth = ["/profile", "/cart", "/api/cart", "/address", "/address/new", "/api/checkout"]
const publicRedirect = ["/signin", "/signup"]
export async function middleware(request) {
    const res = NextResponse.next();
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })
    if (requireAuth.some((path) => request.nextUrl.pathname.startsWith(path))) {
        if (!token) {
            const url = new URL('/signin', request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }
    }
    if (publicRedirect.some((path) => request.nextUrl.pathname.startsWith(path))) {
        if (token) {
            const url = new URL('/', request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }
    }

    return res;
}

export const config = {
    matcher: ['/profile/:path*', '/cart/:path*', '/api/cart/:path*', '/signin/:path*', '/signup/:path*', '/address/:path*'],
}