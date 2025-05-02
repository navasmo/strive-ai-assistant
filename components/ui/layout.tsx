'use client'

import { Header } from '@/components/ui/header'

interface LayoutProps {
  readonly children: React.ReactNode
}

export function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      <Header />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
