import { Result } from 'result-type-ts'
import { describe, expect, test, vi } from 'vitest'

import { getUser } from '~/infra/users'

describe(getUser.name, () => {
  test('API呼び出しに成功した場合、Result.Success型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => {
        return Promise.resolve({
          id: 1,
          name: 'test_name',
          username: 'test_username',
          email: 'test_email',
        })
      },
    })

    const actual = getUser()

    await expect(actual).resolves.toStrictEqual(
      Result.success({
        id: 1,
        name: 'test_name',
        username: 'test_username',
        email: 'test_email',
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/users/1`,
      { method: 'GET' },
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

    const actual = getUser()

    await expect(actual).resolves.toStrictEqual(
      Result.failure({
        status: 500,
        data: {},
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/users/1`,
      { method: 'GET' },
    )
  })

  test('API呼び出しで例外が発生した場合、Result.Failure型のデータを返す', async () => {
    // @ts-ignore
    const spyFetch = vi.spyOn(global, 'fetch').mockRejectedValue(new Error())

    const actual = getUser()

    await expect(actual).resolves.toStrictEqual(
      Result.failure({
        status: 500,
      }),
    )
    expect(spyFetch).toHaveBeenCalledTimes(1)
    expect(spyFetch).toHaveBeenCalledWith(
      `${process.env.JSONPLACEHOLDER_API_URL}/users/1`,
      { method: 'GET' },
    )
  })
})
