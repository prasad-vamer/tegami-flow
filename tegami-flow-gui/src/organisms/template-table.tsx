

import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableHeader, TableRow } from "@/shadcn/components/ui/table"
import { Skeleton } from "@/shadcn/components/ui/skeleton"
import type { Template, TemplateSortField, SortOrder } from "src/types/template"
import { SortField, TableHeaderCell } from "src/atoms/table-header-cell"
import TemplateTableRow from "src/molecules/template-row"

interface TemplateTableProps {
  templates: Template[]
  isLoading: boolean
  sortField: TemplateSortField
  sortOrder: SortOrder
  onSort: (field: TemplateSortField) => void
  onDelete: (id: string) => Promise<boolean>
}

export function TemplateTable({ templates, isLoading, sortField, sortOrder, onSort, onDelete }: TemplateTableProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await onDelete(id)
    } catch (error) {
      console.error("Failed to delete template:", error)
    }
  }

  const handleEdit = (template: Template) => {
    navigate(`/templates/edit/${template.id}`)
  }

  const handleUseTemplate = (templateId: string) => {
    navigate(`/emails/send?templateId=${templateId}`)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell
              sortable
              sortField="name"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort as (field: SortField) => void}
            >
              {t("templates.fields.name")}
            </TableHeaderCell>
            <TableHeaderCell>{t("templates.fields.subject")}</TableHeaderCell>
            <TableHeaderCell>{t("templates.fields.strict")}</TableHeaderCell>
            <TableHeaderCell
              sortable
              sortField="createdAt"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort as (field: SortField) => void}
            >
              {t("templates.fields.createdAt")}
            </TableHeaderCell>
            <TableHeaderCell>{t("common.actions")}</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`loading-${index}`}>
                {Array.from({ length: 5 }).map((_, cellIndex) => (
                  <td key={`cell-${cellIndex}`} className="p-4">
                    <Skeleton className="h-5 w-full" />
                  </td>
                ))}
              </TableRow>
            ))
          ) : templates.length === 0 ? (
            <TableRow>
              <td colSpan={5} className="h-24 text-center">
                {t("templates.noResults")}
              </td>
            </TableRow>
          ) : (
            templates.map((template) => (
              <TemplateTableRow
                key={template.id}
                template={template}
                onEdit={() => handleEdit(template)}
                onDelete={handleDelete}
                onUseTemplate={() => handleUseTemplate(template.id)}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

