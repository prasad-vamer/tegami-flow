import type React from "react"
import type { ButtonHTMLAttributes } from "react"
import { Button } from "@/shadcn/components/ui/button"
import { cn } from "@/shadcn/lib/utils"

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
}

export function ActionButton({ variant = "default", size = "sm", children, className, ...props }: ActionButtonProps) {
  return (
    <Button variant={variant} size={size} className={cn(className)} {...props}>
      {children}
    </Button>
  )
}
