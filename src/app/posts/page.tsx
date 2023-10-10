import type { Metadata } from 'next'

import { getPosts } from '~/infra/posts'
import { ErrorRender } from '~/ui/error'

export const metadata: Metadata = {
  title: 'Posts - タイトル',
}

export default async function page() {
  const posts = await getPosts()

  if (posts.isFailure) {
    return <ErrorRender error={posts.error} />
  }

  return (
    <main>
      <h1>PostsPage</h1>
      <ul>
        {posts.value.map((post) => (
          <li key={post.id}>
            <div>
              <p>userId: {post.userId}</p>
              <p>id: {post.id}</p>
              <p>title: {post.title}</p>
              <p>body: {post.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
