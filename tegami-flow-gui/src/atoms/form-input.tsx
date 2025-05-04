import type React from "react"
import { Input } from "@/shadcn/components/ui/input"
import { cn } from "@/shadcn/lib/utils"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function FormInput({ error, className, ...props }: FormInputProps) {
  return <Input className={cn(error && "border-destructive focus-visible:ring-destructive", className)} {...props} />
}
