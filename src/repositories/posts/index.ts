'use server'

/**
 * @see https://jsonplaceholder.typicode.com/guide/
 */

import { Result } from 'result-type-ts'

import {
  createPostStub,
  getPostStub,
  getPostsStub,
} from '~/repositories/posts/stub'
import type { CreatePostBody, Post } from '~/repositories/posts/type'
import type { RepositoryFailure } from '~/utils/error'
import { logger } from '~/utils/log'
import { incrementErrorCount } from '~/utils/metrics'

export const getPosts = async (): Promise<
  Result<Post[], RepositoryFailure>
> => {
  if (process.env.USE_STUB === 'true') {
    const stub = getPostsStub()
    return Result.success<Post[]>(stub)
  }

  try {
    const response = await fetch(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts?_start=0&_limit=10`,
      { method: 'GET' },
    )

    if (!response.ok) {
      const data = await response.json()
      return Result.failure<RepositoryFailure>({
        status: response.status,
        data,
      })
    }

    const data = await response.json()
    return Result.success<Post[]>(data)
  } catch (err) {
    incrementErrorCount('repositories.posts.getPosts')
    logger.error(err, `Post一覧の取得に失敗しました`)

    return Result.failure<RepositoryFailure>({
      status: 500,
    })
  }
}

export const getPost = async (
  id: Post['id'],
): Promise<Result<Post, RepositoryFailure>> => {
  if (process.env.USE_STUB === 'true') {
    const stub = getPostStub()
    return Result.success<Post>(stub)
  }

  try {
    const response = await fetch(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts/${id}`,
      { method: 'GET' },
    )

    if (!response.ok) {
      const data = await response.json()
      return Result.failure<RepositoryFailure>({
        status: response.status,
        data,
      })
    }

    const data = await response.json()
    return Result.success<Post>(data)
  } catch (err) {
    incrementErrorCount('repositories.posts.getPosts')
    logger.error(err, `Postの取得に失敗しました id=${id}`)

    return Result.failure<RepositoryFailure>({
      status: 500,
    })
  }
}

export const createPost = async (
  body: CreatePostBody,
): Promise<Result<Post, RepositoryFailure>> => {
  if (process.env.USE_STUB === 'true') {
    const stub = createPostStub(body)
    return Result.success(stub)
  }

  try {
    const response = await fetch(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts`,
      { method: 'POST', body: JSON.stringify(body) },
    )

    if (!response.ok) {
      const data = await response.json()
      return Result.failure<RepositoryFailure>({
        status: response.status,
        data,
      })
    }

    const data = await response.json()
    return Result.success<Post>(data)
  } catch (err) {
    incrementErrorCount('repositories.posts.createPost')
    logger.error(err, `Postの作成に失敗しました`)

    return Result.failure<RepositoryFailure>({
      status: 500,
    })
  }
}
