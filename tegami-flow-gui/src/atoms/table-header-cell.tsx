

import type React from "react"
import type { HTMLAttributes } from "react"
import { cn } from "@/shadcn/lib/utils"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import type { CandidateSortField, SortOrder } from "src/types/candidate"
import { LogSortField } from "src/types/log"

export type SortField = CandidateSortField | LogSortField;

interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  className?: string
  sortable?: boolean
  sortField?: SortField
  currentSortField?: SortField
  currentSortOrder?: SortOrder
  onSort?: (field: SortField) => void
}

export function TableHeaderCell({
  children,
  className,
  sortable = false,
  sortField,
  currentSortField,
  currentSortOrder,
  onSort,
  ...props
}: TableHeaderCellProps) {
  const isSorted = sortable && sortField && currentSortField === sortField

  const handleSort = () => {
    if (sortable && sortField && onSort) {
      onSort(sortField)
    }
  }

  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        sortable && "cursor-pointer select-none hover:bg-muted/50",
        className,
      )}
      onClick={handleSort}
      {...props}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortable && sortField && (
          <div className="ml-1">
            {isSorted ? (
              currentSortOrder === "asc" ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )
            ) : (
              <ArrowUpDown className="h-4 w-4 opacity-50" />
            )}
          </div>
        )}
      </div>
    </th>
  )
}
