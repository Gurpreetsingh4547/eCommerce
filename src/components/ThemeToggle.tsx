"use client"

import { useTheme } from "@/components/ThemeProvider"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full w-8 h-8 p-0 hover:bg-secondary/30 dark:hover:bg-slate-800"
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun className={`h-4 w-4 transition-all scale-100 rotate-0 ${theme === 'dark' ? 'scale-0 -rotate-90' : ''}`} />
      <Moon className={`absolute h-4 w-4 transition-all scale-0 rotate-90 ${theme === 'dark' ? 'scale-100 rotate-0' : ''}`} />
    </Button>
  )
} 