

import { useTranslation } from "react-i18next"
import { Table, TableBody, TableHeader, TableRow } from "@/shadcn/components/ui/table"
import { Skeleton } from "@/shadcn/components/ui/skeleton"
import type { EmailLog, LogSortField, SortOrder } from "src/types/log"
import { SortField, TableHeaderCell } from "src/atoms/table-header-cell"
import { LogRow } from "src/molecules/log-row"

interface LogsTableProps {
  logs: EmailLog[]
  isLoading: boolean
  sortField: LogSortField
  sortOrder: SortOrder
  onSort: (field: LogSortField) => void
}

export function LogsTable({ logs, isLoading, sortField, sortOrder, onSort }: LogsTableProps) {
  const { t } = useTranslation()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>{t("logs.fields.candidate")}</TableHeaderCell>
            <TableHeaderCell>{t("logs.fields.template")}</TableHeaderCell>
            <TableHeaderCell>{t("logs.fields.to")}</TableHeaderCell>
            <TableHeaderCell>{t("logs.fields.subject")}</TableHeaderCell>
            <TableHeaderCell
              sortable
              sortField="status"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort as (field: SortField) => void}
            >
              {t("logs.fields.status")}
            </TableHeaderCell>
            <TableHeaderCell
              sortable
              sortField="sentAt"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort as (field: SortField) => void}
            >
              {t("logs.fields.sentAt")}
            </TableHeaderCell>
            <TableHeaderCell>{t("common.actions")}</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`loading-${index}`}>
                {Array.from({ length: 7 }).map((_, cellIndex) => (
                  <td key={`cell-${cellIndex}`} className="p-4">
                    <Skeleton className="h-5 w-full" />
                  </td>
                ))}
              </TableRow>
            ))
          ) : logs.length === 0 ? (
            <TableRow>
              <td colSpan={7} className="h-24 text-center">
                {t("logs.noResults")}
              </td>
            </TableRow>
          ) : (
            logs.map((log) => <LogRow key={log.id} log={log} />)
          )}
        </TableBody>
      </Table>
    </div>
  )
}
