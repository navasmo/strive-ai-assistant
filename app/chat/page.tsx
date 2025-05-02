'use client'

import { ChatContainer } from '@/components/chatbot/chat-container'
import { Header } from '@/components/ui/header'

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <ChatContainer />
      </main>
    </div>
  )
}
