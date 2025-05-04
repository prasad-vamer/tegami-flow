import type React from "react"
import type { HTMLAttributes } from "react"
import { cn } from "@/shadcn/lib/utils"

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export function TableCell({ children, className, ...props }: TableCellProps) {
  return (
    <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props}>
      {children}
    </td>
  )
}
