import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kaptha Email Editor - Next.js Demo',
  description: 'Build beautiful emails with drag and drop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
