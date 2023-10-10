import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { incrementAccessCount } from '~/util/metric'

export function middleware(request: NextRequest) {
  incrementAccessCount(request.nextUrl.pathname, request.method)
  console.info(
    JSON.stringify({
      msg: `request incoming`,
      req: { url: request.nextUrl, method: request.method },
    }),
  )

  const response = NextResponse.next()

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
