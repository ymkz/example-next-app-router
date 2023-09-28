import type { Metadata } from 'next'
import '~/app/global.scss'

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'タイトル',
}

export default function layout({ children }: Props) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
