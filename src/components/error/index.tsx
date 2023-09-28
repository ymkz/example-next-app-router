import type { RepositoryFailure } from '~/utils/error'

type Props = {
  error: RepositoryFailure
}
export const ErrorRender = ({ error }: Props) => {
  return (
    <div>
      <h1>Error</h1>
      <div>{error.status}</div>
      <div>{JSON.stringify(error.data)}</div>
    </div>
  )
}
