"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/ui/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="inline-flex items-center justify-center rounded-full p-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 text-orange-500 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 text-purple-500 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
