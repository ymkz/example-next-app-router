import type { User } from '~/infra/users/type'

import style from './style.module.scss'

type Props = {
  user: User
}

export const Header = ({ user }: Props) => {
  return (
    <header className={style.header}>
      <div>header</div>
      <div>{user.username}</div>
    </header>
  )
}
