import type { User } from '~/infra/users/type'

export const getUserStub = (): User => {
  return {
    id: 1,
    name: 'stub_name',
    username: 'stub_username',
    email: 'stub_email',
  }
}
