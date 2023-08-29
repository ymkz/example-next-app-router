'use server'

/**
 * @link https://jsonplaceholder.typicode.com/guide/
 */

import axios, { AxiosError } from 'axios'
import { notFound } from 'next/navigation'

import { incrementRequestCount } from '~/helpers/metrics'
import type { Post } from '~/repositories/posts/interface'
import { getPostStub, getPostsStub } from '~/repositories/posts/stub'

export const getPosts = async (): Promise<Post[]> => {
  incrementRequestCount('GET_POSTS')
  console.info(`[repository] getPosts`)

  if (process.env.USE_STUB === 'true') {
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

  if (process.env.USE_STUB === 'true') {
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
    if (err instanceof AxiosError && err.response?.status === 404) {
      console.error(`存在しないPostの取得のため失敗しました id=${id}`)
      notFound()
    }

    console.error(`Postの取得に失敗しました id=${id}`)
    throw new Error(`Postの取得に失敗しました id=${id}`, {
      cause: err,
    })
  }
}
