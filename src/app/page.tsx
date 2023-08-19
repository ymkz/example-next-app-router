import Link from 'next/link'

const IndexPage = () => {
  return (
    <ul>
      <li>
        <Link prefetch={false} href="/">
          index
        </Link>
      </li>
      <li>
        <Link prefetch={false} href="/posts">
          /posts
        </Link>
      </li>
      <li>
        <Link prefetch={false} href="/posts/1">
          /posts/1
        </Link>
      </li>
      <li>
        <Link prefetch={false} href="/posts/9999">
          /posts/9999
        </Link>
      </li>
    </ul>
  )
}

export default IndexPage
