import type { Metadata } from 'next'
import '~/app/global.scss'

interface IndexLayoutProps {
  children: React.ReactNode
}

const IndexLayout = ({ children }: IndexLayoutProps) => {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'タイトル',
}

export default IndexLayout
