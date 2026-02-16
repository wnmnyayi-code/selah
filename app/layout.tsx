import type { Metadata, Viewport } from 'next'
import { Lora, Inter } from 'next/font/google'

import './globals.css'

const _lora = Lora({ subsets: ['latin'], variable: '--font-serif' })
const _inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Selah - Faith & Belief Prayer Generator',
  description:
    'Generate personalized prayers based on your faith, beliefs, and intentions. Respectful, inclusive, and available for all spiritual traditions.',
}

export const viewport: Viewport = {
  themeColor: '#4a8c6f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
