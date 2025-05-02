'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendIcon, Smile } from 'lucide-react'
import { motion } from 'framer-motion'

// Emoji picker options
const emojiOptions = [
  { id: 'smile', emoji: '😊' },
  { id: 'thumbsup', emoji: '👍' },
  { id: 'celebrate', emoji: '🙌' },
  { id: 'thinking', emoji: '🤔' },
  { id: 'wow', emoji: '😮' },
  { id: 'clap', emoji: '👏' },
  { id: 'idea', emoji: '💡' },
  { id: 'target', emoji: '🎯' },
  { id: 'rocket', emoji: '🚀' },
  { id: 'dev', emoji: '👨‍💻' },
  { id: 'sad', emoji: '😢' },
  { id: 'cool', emoji: '😎' }
]

interface ChatInputProps {
  readonly onSendMessage: (message: string) => void
  readonly isLoading?: boolean
  readonly placeholder?: string
  readonly onboardingStep?: string
}

export function ChatInput({
  onSendMessage,
  isLoading = false,
  placeholder = 'Type your message...',
  onboardingStep = 'complete'
}: Readonly<ChatInputProps>) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Implement typing indicator logic
  useEffect(() => {
    if (message.length > 0 && !isTyping) {
      setIsTyping(true)
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    if (message.length > 0) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 1500)
    } else {
      setIsTyping(false)
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [message])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage('')
      inputRef.current?.focus()
    }
  }
  
  const handleEmojiClick = (emoji: string) => {
    setMessage(prev => prev + emoji)
    setShowEmojiPicker(false)
    inputRef.current?.focus()
  }

  return (
    <div className="px-4 pb-4 pt-2 bg-gradient-to-b from-transparent to-white/90 dark:to-gray-900/90 backdrop-blur-sm sticky bottom-0 w-full">
      {isTyping && (
        <div className="text-xs text-purple-600 dark:text-purple-400 pb-1 pl-4 animate-pulse">
          You're typing...
        </div>
      )}
      
      <form 
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-2 rounded-2xl border border-purple-100 dark:border-purple-800/30 bg-white dark:bg-gray-800 shadow-sm max-w-3xl mx-auto w-full"
      >
        <div className="relative">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Button 
              type="button"
              variant="ghost" 
              size="icon"
              className="rounded-full h-9 w-9 text-gray-500 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-5 w-5" />
            </Button>
          </motion.div>
          
          {/* Emoji picker dropdown */}
          {showEmojiPicker && (
            <div 
              ref={emojiPickerRef}
              className="absolute bottom-12 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10"
            >
              <div className="grid grid-cols-6 gap-1">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji.id}
                    type="button"
                    onClick={() => handleEmojiClick(emoji.emoji)}
                    className="text-xl p-1.5 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md"
                  >
                    {emoji.emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e)
            }
          }}
        />
        
        {message.trim() !== '' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              type="submit" 
              disabled={isLoading || !message.trim()}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-full w-9 h-9 p-0 flex items-center justify-center shadow-sm"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </form>
    </div>
  )
}
