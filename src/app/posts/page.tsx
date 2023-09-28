import { ErrorRender } from '~/components/error'
import { getPosts } from '~/repositories/posts'

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
