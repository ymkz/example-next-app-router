import { redirect } from 'next/navigation'

import { getUser } from '~/infra/users'
import { Footer } from '~/ui/footer'
import { Header } from '~/ui/header'

type Props = {
  children: React.ReactNode
}

export default async function layout({ children }: Props) {
  const user = await getUser()

  if (user.isFailure) {
    redirect('https://example.com')
  }

  return (
    <>
      <Header user={user.value} />
      {children}
      <Footer />
    </>
  )
}
