import Link from 'next/link'

import { logger } from '~/utils/log'
import { incrementAccessCount } from '~/utils/metrics'

export default async function page() {
  incrementAccessCount('/', 'GET')
  logger.info('request incoming to /')

  return (
    <ul>
      <li>
        <Link href="/" prefetch={false}>
          index
        </Link>
      </li>
      <li>
        <Link href="/posts" prefetch={false}>
          /posts
        </Link>
      </li>
      <li>
        <Link href="/posts/1" prefetch={false}>
          /posts/1
        </Link>
      </li>
      <li>
        <Link href="/posts/9999" prefetch={false}>
          /posts/9999
        </Link>
      </li>
      <li>
        {/* @ts-ignore */}
        <Link href="/notfound" prefetch={false}>
          /notfound
        </Link>
      </li>
    </ul>
  )
}
