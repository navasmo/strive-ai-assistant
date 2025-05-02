'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { ThemeToggle } from './theme-toggle'
import { motion } from 'framer-motion'

export function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const pathname = usePathname()

  // Navigation items
  const navItems = [
    { name: 'Chat', href: '/' },
    { name: 'Resources', href: '/resources' },
    { name: 'About', href: '/about' },
  ]

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 font-brand text-center">
              Strive
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-1 relative"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.div 
                className="w-5 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 2 : -3,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.div 
                className="w-5 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? -2 : 3,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden py-2 px-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
