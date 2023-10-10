import { Result } from 'result-type-ts'
import { describe, expect, test, vi } from 'vitest'

import { createPost, getPost, getPosts } from '~/infra/posts'

describe(getPosts.name, () => {
  test('API呼び出しに成功した場合、Result.Success型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => {
        return Promise.resolve([
          {
            userId: 1,
            id: 1,
            title: 'test_title',
            body: 'test_body',
          },
        ])
      },
    })

    const actual = getPosts()

    await expect(actual).resolves.toStrictEqual(
      Result.success([
        {
          userId: 1,
          id: 1,
          title: 'test_title',
          body: 'test_body',
        },
      ]),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts?_start=0&_limit=10`,
      {
        method: 'GET',
      },
    )
  })

  test('API呼び出しでエラーがレスポンスされた場合、Result.Failure型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: () => {
        return Promise.resolve({})
      },
    })

    const actual = getPosts()

    await expect(actual).resolves.toStrictEqual(
      Result.failure({
        status: 500,
        data: {},
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts?_start=0&_limit=10`,
      {
        method: 'GET',
      },
    )
  })

  test('API呼び出しで例外が発生した場合、Result.Failure型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockRejectedValue(new Error())

    const actual = getPosts()

    await expect(actual).resolves.toStrictEqual(
      Result.failure({
        status: 500,
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts?_start=0&_limit=10`,
      {
        method: 'GET',
      },
    )
  })
})

describe(getPost.name, () => {
  test('API呼び出しに成功した場合、Result.Success型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => {
        return Promise.resolve({
          userId: 1,
          id: 1,
          title: 'test_title',
          body: 'test_body',
        })
      },
    })

    const actual = getPost(1)

    await expect(actual).resolves.toStrictEqual(
      Result.success({
        userId: 1,
        id: 1,
        title: 'test_title',
        body: 'test_body',
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts/1`,
      {
        method: 'GET',
      },
    )
  })

  test('API呼び出しでエラーがレスポンスされた場合、Result.Failure型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: () => {
        return Promise.resolve({})
      },
    })

    const actual = getPost(1)

    await expect(actual).resolves.toStrictEqual(
      Result.failure({
        status: 500,
        data: {},
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts/1`,
      {
        method: 'GET',
      },
    )
  })

  test('API呼び出しで例外が発生した場合、Result.Failure型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockRejectedValue(new Error())

    const actual = getPost(1)

    await expect(actual).resolves.toStrictEqual(
      Result.failure({
        status: 500,
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts/1`,
      {
        method: 'GET',
      },
    )
  })
})

describe(createPost.name, () => {
  test('API呼び出しに成功した場合、Result.Success型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => {
        return Promise.resolve({
          userId: 1,
          id: 1,
          title: 'test_title',
          body: 'test_body',
        })
      },
    })

    const actual = createPost({
      title: 'test_title',
      body: 'test_body',
      userId: 1,
    })

    await expect(actual).resolves.toStrictEqual(
      Result.success({
        userId: 1,
        id: 1,
        title: 'test_title',
        body: 'test_body',
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts`,
      {
        method: 'POST',
        body: JSON.stringify({
          title: 'test_title',
          body: 'test_body',
          userId: 1,
        }),
      },
    )
  })

  test('API呼び出しでエラーがレスポンスされた場合、Result.Failure型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: () => {
        return Promise.resolve({})
      },
    })

    const actual = createPost({
      title: 'test_title',
      body: 'test_body',
      userId: 1,
    })

    await expect(actual).resolves.toStrictEqual(
      Result.failure({
        status: 500,
        data: {},
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts`,
      {
        method: 'POST',
        body: JSON.stringify({
          title: 'test_title',
          body: 'test_body',
          userId: 1,
        }),
      },
    )
  })

  test('API呼び出しで例外が発生した場合、Result.Failure型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockRejectedValue(new Error())

    const actual = createPost({
      title: 'test_title',
      body: 'test_body',
      userId: 1,
    })

    await expect(actual).resolves.toStrictEqual(
      Result.failure({
        status: 500,
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts`,
      {
        method: 'POST',
        body: JSON.stringify({
          title: 'test_title',
          body: 'test_body',
          userId: 1,
        }),
      },
    )
  })
})
