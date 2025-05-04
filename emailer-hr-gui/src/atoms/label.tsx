import type React from "react"
import type { HTMLAttributes } from "react"
import { cn } from "@/shadcn/lib/utils"

interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <span
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
