import { getPosts } from '~/repositories/posts'

const PostsPage = async () => {
  const posts = await getPosts()

  return (
    <>
      <h1>PostsPage</h1>
      <ul>
        {posts.map((post) => (
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
    </>
  )
}

export default PostsPage
