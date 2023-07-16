import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get('access_token')
  let pathname: string;
  if (request.nextUrl.pathname !== "/admin") {
    pathname = request.nextUrl.pathname;
  } else {
    pathname = "/admin/dashboard";
  }
  if (pathname === "/admin/signin" && cookie) {
    return NextResponse.rewrite(new URL("/admin/dashboard", request.url))
  }
  if (pathname.startsWith("/admin")) {
    if (cookie){
      return NextResponse.rewrite(new URL(pathname, request.url))
    }else{
      return NextResponse.rewrite(new URL('/admin/signin', request.url))
    }
  }
}