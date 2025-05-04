import type React from "react"
import { Label } from "@/shadcn/components/ui/label"
import { cn } from "@/shadcn/lib/utils"

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  required?: boolean
}

export function FormLabel({ children, required = false, className, ...props }: FormLabelProps) {
  return (
    <Label className={cn("text-sm font-medium", className)} {...props}>
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
  )
}
