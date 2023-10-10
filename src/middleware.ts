import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { timestamp } from '~/util/log'
import { incrementAccessCount } from '~/util/metric'

export function middleware(request: NextRequest) {
  incrementAccessCount(request.nextUrl.pathname, request.method)

  // pinoがwebpackのbundleの影響でmiddleware上で動作しないためフォールバックの実装でカバー
  console.info(
    JSON.stringify({
      level: 'info',
      timestamp: timestamp(),
      req: { url: request.nextUrl, method: request.method },
      msg: `request incoming`,
    }),
  )

  const response = NextResponse.next()

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
