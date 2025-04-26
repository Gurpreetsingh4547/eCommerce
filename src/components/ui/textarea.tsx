import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[var(--radius)] border border-border/10 bg-white px-4 py-3 text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/10 focus:border-primary/20 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:border-slate-600",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea } 