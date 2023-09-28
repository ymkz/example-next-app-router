import { redirect } from 'next/navigation'

import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { getUser } from '~/repositories/users'

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
