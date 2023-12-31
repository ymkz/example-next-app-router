/**
 * @see https://jsonplaceholder.typicode.com/guide/
 */

import { Result } from 'result-type-ts'

import { getUserStub } from '~/infra/users/stub'
import type { User } from '~/infra/users/type'
import type { RepositoryFailure } from '~/util/error'
import { logger } from '~/util/log'
import { incrementErrorCount } from '~/util/metric'

export const getUser = async (): Promise<Result<User, RepositoryFailure>> => {
  if (process.env.USE_STUB === 'true') {
    const stub = getUserStub()
    return Result.success<User>(stub)
  }

  try {
    const response = await fetch(
      `${process.env.JSONPLACEHOLDER_API_URL}/users/1`,
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
    return Result.success<User>(data)
  } catch (err) {
    incrementErrorCount('repositories.users.getUser')
    logger.error(err, `Userの取得に失敗しました`)

    return Result.failure<RepositoryFailure>({
      status: 500,
    })
  }
}
