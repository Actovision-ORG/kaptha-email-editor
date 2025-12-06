import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kaptha Email Editor - Next.js Demo',
  description: 'Demo of Kaptha Email Editor in Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>{children}</body>
    </html>
  )
}
