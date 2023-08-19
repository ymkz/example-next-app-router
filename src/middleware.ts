import { NextResponse, type NextMiddleware } from 'next/server'

export const middleware: NextMiddleware = (request) => {
  console.info(
    `[middleware] incoming method=${request.method} path=${request.nextUrl.pathname}`,
  )

  const response = NextResponse.next()

  console.info(`[middleware] completed status=${response.status}`)

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
