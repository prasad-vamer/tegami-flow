import type React from "react"
import { cn } from "@/shadcn/lib/utils"

interface FormErrorProps {
  id?: string
  children: React.ReactNode
  className?: string
}

export function FormError({ id, children, className }: FormErrorProps) {
  if (!children) return null

  return <p className={cn("text-sm font-medium text-destructive mt-1", className)} id={id}>{children}</p>
}
