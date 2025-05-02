'use client'

import React, { useEffect, useState, Children, useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'
import { ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

// Component props type for ReactMarkdown components
type MarkdownComponentProps = {
  node?: any;
  children?: React.ReactNode;
  className?: string;
}

// Custom renderer for list items with bold headings
const renderListItemWithBoldHeading = ({ children, ...props }: MarkdownComponentProps) => {
  // Convert children to array if it's not already
  const childrenArray = Children.toArray(children);
  
  // Check if the first child is a paragraph that contains a strong element
  if (childrenArray.length > 0) {
    return (
      <li className="my-1.5" {...props}>
        {children}
      </li>
    );
  }
  
  return <li className="my-1.5" {...props}>{children}</li>;
};

// Style paragraphs
const p = ({ children, ...props }: MarkdownComponentProps) => {
  // Check if this paragraph is part of a list item and doesn't need extra margin
  const isInListItem = props.node?.parent?.type === 'listItem';
  
  return (
    <p 
      className={cn(
        "text-gray-700 dark:text-gray-300",
        isInListItem ? "mb-0.5" : "mb-1" // Reduce spacing slightly
      )} 
      {...props}
    >
      {children}
    </p>
  );
}

interface ChatMessageProps {
  readonly content: string
  readonly role: 'user' | 'assistant' | 'system'
  readonly isLoading?: boolean
  readonly timestamp?: Date
  readonly messageId?: string
  readonly onFeedback?: (messageId: string, feedback: 'like' | 'dislike') => void
}

export function ChatMessage({ 
  content, 
  role, 
  isLoading = false, 
  timestamp, 
  messageId,
  onFeedback 
}: Readonly<ChatMessageProps>) {
  const [typedContent, setTypedContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  // For typing effect on assistant messages
  useEffect(() => {
    if (role === 'assistant' && !isLoading) {
      setIsTyping(true)
      setTypedContent('') // Reset content immediately
      
      // Find first word boundary to prevent showing partial words
      const firstSpaceIndex = content.indexOf(' ');
      let firstWordLength = firstSpaceIndex > -1 ? firstSpaceIndex : content.length; // Handle single-word messages
      
      // Start with the first complete word to avoid showing misspelled words
      // Set it directly, then start the interval slightly delayed
      const initialWord = content.substring(0, firstWordLength);
      setTypedContent(initialWord);
      
      // Only start typing the rest if there's more content
      if (firstWordLength < content.length) {
        let i = firstWordLength;
        const typeInterval = setInterval(() => {
          if (i < content.length) {
            // Append characters one by one
            setTypedContent((prev) => prev + content.charAt(i));
            i++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
          }
        }, 20); // Slightly adjusted typing speed
        
        // Clear interval on cleanup
        return () => clearInterval(typeInterval);
      } else {
        // If the message is only one word, finish typing immediately
        setIsTyping(false);
      }
    }
  }, [content, role, isLoading]);

  // Extract disclaimer if present
  const [mainContent, disclaimer] = useMemo(() => {
    if (role !== 'assistant' || !content) return [content, ''];
    
    // Look for disclaimer pattern: "*Please remember..." at the end of the message
    const disclaimerMatch = content.match(/(\*Please remember.*counsellor\.\*)$/);
    
    if (disclaimerMatch) {
      return [
        content.replace(disclaimerMatch[0], '').trim(),
        disclaimerMatch[0]
      ];
    }
    
    return [content, ''];
  }, [content, role]);
  
  // Determine what content to display based on loading and typing state
  const displayContent = () => {
    if (isLoading) {
      return (
        <div className="flex space-x-2 items-center py-2 px-1">
          <motion.div 
            className="h-2.5 w-2.5 rounded-full bg-purple-500 dark:bg-purple-400" 
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="h-2.5 w-2.5 rounded-full bg-purple-500 dark:bg-purple-400" 
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="h-2.5 w-2.5 rounded-full bg-purple-500 dark:bg-purple-400" 
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )
    }
    
    if (role === 'assistant' && isTyping) {
      return (
        <div className="assistant-message">
          <ReactMarkdown
            components={{
              // Style headings
              h1: ({ children, ...props }: MarkdownComponentProps) => <h1 className="text-lg font-bold my-2" {...props}>{children}</h1>,
              h2: ({ children, ...props }: MarkdownComponentProps) => <h2 className="text-md font-bold my-2" {...props}>{children}</h2>,
              h3: ({ children, ...props }: MarkdownComponentProps) => <h3 className="text-md font-bold my-1" {...props}>{children}</h3>,
              
              // Style lists
              ul: ({ children, ...props }: MarkdownComponentProps) => (
                <ul className="list-disc list-outside ml-5 my-3 space-y-1" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }: MarkdownComponentProps) => (
                <ol className="list-decimal list-outside ml-5 my-3 space-y-1" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }: MarkdownComponentProps) => (
                <li className="my-0.5" {...props}>{children}</li> // Reduced list item margin
              ),
              // Style bold text
              strong: ({ children, ...props }: MarkdownComponentProps) => <strong className="font-bold text-purple-700 dark:text-purple-300 inline" {...props}>{children}</strong>,
              
              // Style paragraphs
              p: p,
            }}
          >
            {typedContent}
          </ReactMarkdown>
          
          {/* Disclaimer */}
          {disclaimer && (
            <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs italic text-gray-500 dark:text-gray-400">
              <ReactMarkdown>{disclaimer}</ReactMarkdown>
            </div>
          )}
        </div>
      )
    }
    
    if (role === 'assistant') {
      return (
        <div className="assistant-message">
          <ReactMarkdown
            components={{
              // Style headings
              h1: ({ children, ...props }: MarkdownComponentProps) => <h1 className="text-lg font-bold my-2" {...props}>{children}</h1>,
              h2: ({ children, ...props }: MarkdownComponentProps) => <h2 className="text-md font-bold my-2" {...props}>{children}</h2>,
              h3: ({ children, ...props }: MarkdownComponentProps) => <h3 className="text-md font-bold my-1" {...props}>{children}</h3>,
              
              // Style lists
              ul: ({ children, ...props }: MarkdownComponentProps) => (
                <ul className="list-disc list-outside ml-5 my-3 space-y-1" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }: MarkdownComponentProps) => (
                <ol className="list-decimal list-outside ml-5 my-3 space-y-1" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }: MarkdownComponentProps) => (
                <li className="my-0.5" {...props}>{children}</li> // Reduced list item margin
              ),
              // Style bold text
              strong: ({ children, ...props }: MarkdownComponentProps) => <strong className="font-bold text-purple-700 dark:text-purple-300 inline" {...props}>{children}</strong>,
              
              // Style paragraphs
              p: p,
            }}
          >
            {mainContent}
          </ReactMarkdown>
          
          {/* Disclaimer */}
          {disclaimer && (
            <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs italic text-gray-500 dark:text-gray-400">
              <ReactMarkdown>{disclaimer}</ReactMarkdown>
            </div>
          )}
        </div>
      )
    }
    
    return content
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex w-full mb-4 max-w-3xl mx-auto',
        role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {role === 'assistant' && (
        <div className="flex-shrink-0 mr-2 self-end">
          <Avatar className="h-10 w-10 border-2 border-purple-200 dark:border-purple-800 shadow-sm">
            <AvatarImage src="/strive-logo.png" alt="Strive Bot" />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-brand">S</AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'max-w-[85%] md:max-w-[75%] text-sm rounded-2xl shadow-sm',
          role === 'user'
            ? 'user-message bg-gradient-to-r from-purple-600 to-purple-700 text-white'
            : 'bot-message bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-800/30',
          'relative group' // Add group for hover effect
        )}
      >
        <div className="flex flex-col">
          {role === 'assistant' && (
            <div className="text-xs font-medium pl-3 pt-2 text-purple-700 dark:text-purple-400 font-brand">
              Strive AI
            </div>
          )}
          
          <div className={cn(
            "p-3 whitespace-pre-wrap break-words",
            role === 'user' ? "pt-3" : "pt-1"
          )}>
            {displayContent()}
          </div>
          
          {timestamp && (
            <div className={cn(
              "text-xs px-3 pb-2 flex items-center",
              role === 'user' ? "text-white/70 justify-end" : "text-purple-700/70 dark:text-purple-400/70"
            )}>
              <span className="inline-flex items-center">
                {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}
        </div>
        
        {/* Feedback Buttons (only for assistant messages, not loading, NOT typing, and handler provided) */}
        {role === 'assistant' && !isLoading && !isTyping && onFeedback && messageId && (
          <div className="absolute -bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={() => onFeedback(messageId, 'like')}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-green-500"
              aria-label="Like this response"
            >
              <ThumbsUpIcon size={14} />
            </button>
            <button 
              onClick={() => onFeedback(messageId, 'dislike')}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-red-500"
              aria-label="Dislike this response"
            >
              <ThumbsDownIcon size={14} />
            </button>
          </div>
        )}
      </motion.div>
      
      {role === 'user' && (
        <div className="flex-shrink-0 ml-2 self-end">
          <Avatar className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-2 border-indigo-200 dark:border-indigo-800 shadow-sm">
            <AvatarFallback>Me</AvatarFallback>
          </Avatar>
        </div>
      )}
    </motion.div>
  )
}
