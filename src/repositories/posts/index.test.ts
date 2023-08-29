import axios, { AxiosError } from 'axios'
import * as navigation from 'next/navigation'
import { describe, expect, test, vi } from 'vitest'

import { getPost, getPosts } from '~/repositories/posts'

describe(getPosts.name, () => {
  test('取得に成功した場合、レスポンスボディーを返す', async () => {
    const spyAxiosGet = vi.spyOn(axios, 'get').mockResolvedValue({
      data: [
        {
          userId: 0,
          id: 1,
          title: 'mocked_title',
          body: 'mocked_body',
        },
      ],
    })

    expect(getPosts()).resolves.toStrictEqual([
      {
        userId: 0,
        id: 1,
        title: 'mocked_title',
        body: 'mocked_body',
      },
    ])
    expect(spyAxiosGet).toHaveBeenCalledTimes(1)
    expect(spyAxiosGet).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts?_start=0&_limit=10`,
      { timeout: 3000 },
    )
  })

  test('取得に失敗した場合、例外をスローする', async () => {
    const spyAxiosGet = vi.spyOn(axios, 'get').mockRejectedValue(new Error())

    expect(getPosts()).rejects.toThrow('Post一覧の取得に失敗しました')
    expect(spyAxiosGet).toHaveBeenCalledTimes(1)
    expect(spyAxiosGet).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts?_start=0&_limit=10`,
      { timeout: 3000 },
    )
  })
})

describe(getPost.name, () => {
  test('取得に成功した場合、レスポンスボディーを返す', async () => {
    const spyAxiosGet = vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        userId: 0,
        id: 1,
        title: 'mocked_title',
        body: 'mocked_body',
      },
    })

    expect(getPost(0)).resolves.toStrictEqual({
      userId: 0,
      id: 1,
      title: 'mocked_title',
      body: 'mocked_body',
    })
    expect(spyAxiosGet).toHaveBeenCalledTimes(1)
    expect(spyAxiosGet).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts/0`,
      { timeout: 3000 },
    )
  })

  test.skip('存在しないidが渡された場合、notFoundが呼ばれる', async () => {
    const spyAxiosGet = vi
      .spyOn(axios, 'get')
      .mockRejectedValue(new AxiosError())
    const spyNotFound = vi.spyOn(navigation, 'notFound')

    await getPost(0)

    expect(spyAxiosGet).toHaveBeenCalledTimes(1)
    expect(spyAxiosGet).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts/0`,
      { timeout: 3000 },
    )
    expect(spyNotFound).toHaveBeenCalledTimes(1)
  })

  test('取得に失敗した場合、例外をスローする', async () => {
    const spyAxiosGet = vi
      .spyOn(axios, 'get')
      .mockRejectedValue(new AxiosError())

    expect(getPost(0)).rejects.toThrow(`Postの取得に失敗しました id=0`)
    expect(spyAxiosGet).toHaveBeenCalledTimes(1)
    expect(spyAxiosGet).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/posts/0`,
      { timeout: 3000 },
    )
  })
})
