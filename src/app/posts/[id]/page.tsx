import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ErrorRender } from '~/components/error'
import { getPost } from '~/repositories/posts'

export const metadata: Metadata = {
  title: 'Post - タイトル',
}

type Props = {
  params: {
    id: string
  }
}

export default async function page({ params }: Props) {
  const post = await getPost(Number(params.id))

  if (post.isFailure) {
    if (post.error.status === 404) {
      notFound()
    } else {
      return <ErrorRender error={post.error} />
    }
  }

  return (
    <>
      <h1>PostPage</h1>
      <div>
        <p>userId: {post.value.userId}</p>
        <p>id: {post.value.id}</p>
        <p>title: {post.value.title}</p>
        <p>body: {post.value.body}</p>
      </div>
    </>
  )
}
