'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ChatOptionProps {
  readonly text: string;
  readonly onClick: () => void;
  readonly icon?: React.ReactNode;
}

export function ChatOption({ text, onClick, icon }: Readonly<ChatOptionProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <Button
        variant="outline"
        className={cn(
          "bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/50",
          "hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-800 dark:hover:text-purple-300",
          "hover:border-purple-500 dark:hover:border-purple-600 font-medium rounded-xl",
          "text-sm px-4 py-2.5 transition-all shadow-sm flex items-center space-x-1.5"
        )}
        onClick={onClick}
      >
        {icon && <span className="mr-1.5">{icon}</span>}
        <span>{text}</span>
      </Button>
    </motion.div>
  )
}
