import { notFound } from 'next/navigation'

import { accessLogging } from '~/helpers/logger'
import { getPost } from '~/repositories/posts'

interface PostPageProps {
  readonly params: {
    id: string
  }
}

const PostPage = async ({ params }: PostPageProps) => {
  accessLogging()

  const post = await getPost(Number(params.id))

  if (!post) {
    notFound()
  }

  return (
    <>
      <h1>PostPage</h1>
      <div>
        <p>userId: {post.userId}</p>
        <p>id: {post.id}</p>
        <p>title: {post.title}</p>
        <p>body: {post.body}</p>
      </div>
    </>
  )
}

export default PostPage
