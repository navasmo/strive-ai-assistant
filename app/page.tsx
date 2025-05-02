'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  
  // Redirect to chat page automatically
  useEffect(() => {
    router.push('/chat')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-4 font-brand">Strive AI Chatbot</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Redirecting to chat...</p>
        <div className="w-16 h-16 border-4 border-purple-700 dark:border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
}
