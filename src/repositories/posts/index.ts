'use server'

import axios, { AxiosError } from 'axios'
import { notFound } from 'next/navigation'
import { incrementRequestCount } from '~/helpers/metrics'
import type { Post } from '~/repositories/posts/interface'
import { getPostStub, getPostsStub } from '~/repositories/posts/stub'

/**
 * @link https://jsonplaceholder.typicode.com/guide/
 */

const USE_STUB = false

export const getPosts = async (): Promise<Post[]> => {
  incrementRequestCount('GET_POSTS')
  console.info(`[repository] getPosts`)

  if (USE_STUB && process.env.ENVIRONMENT === 'local') {
    return getPostsStub()
  }

  try {
    const response = await axios.get<Post[]>(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts?_start=0&_limit=10`,
      {
        timeout: 3000,
      },
    )
    return response.data
  } catch (err) {
    console.error(err, `Post一覧の取得に失敗しました`)
    throw new Error(`Post一覧の取得に失敗しました`, {
      cause: err,
    })
  }
}

export const getPost = async (id: Post['id']): Promise<Post> => {
  incrementRequestCount('GET_POST')
  console.info(`[repository] getPost`)

  if (USE_STUB && process.env.ENVIRONMENT === 'local') {
    return getPostStub()
  }

  try {
    const response = await axios.get<Post>(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts/${id}`,
      {
        timeout: 3000,
      },
    )
    return response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 404) {
        console.error(`存在しないPostの取得のため失敗しました id=${id}`)
        notFound()
      }
    }

    console.error(`Postの取得に失敗しました id=${id}`)
    throw new Error(`Postの取得に失敗しました id=${id}`, {
      cause: err,
    })
  }
}
