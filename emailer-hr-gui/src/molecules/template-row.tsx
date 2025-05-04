import { useTranslation } from "react-i18next"
import { Template } from "src/types/template"
import { TableCell } from "src/atoms/table-cell"
import { ActionButton } from "src/atoms/action-button"
import { DeleteConfirmDialog } from "src/molecules/delete-confirm-dialog"
import { useState } from "react"
import { Pencil, Trash2, Check, X, MailPlus } from "lucide-react"
import { TableRow } from "@/shadcn/components/ui/table"


interface TemplateTableRowProps {
  template: Template
  onEdit: () => void
  onDelete: (id: string) => Promise<void>
  onUseTemplate: () => void
}

export default function TemplateTableRow({ template, onEdit, onDelete, onUseTemplate }: TemplateTableRowProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { t } = useTranslation()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await onDelete(template.id)
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const truncateSubject = (subject: string, maxLength = 40) => {
    return subject.length > maxLength ? `${subject.substring(0, maxLength)}...` : subject
  }

  const formattedDate = template.createdAt ? new Date(template.createdAt).toLocaleDateString() : "N/A"

  return (
    <TableRow className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <TableCell>{template.name}</TableCell>
      <TableCell>{truncateSubject(template.subject)}</TableCell>
      <TableCell>
        {template.strict ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
      </TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ActionButton
            variant="outline"
            size="icon"
            onClick={onUseTemplate}
            aria-label={t("templates.actions.use")}
            title={t("templates.actions.use")}
          >
            <MailPlus className="h-4 w-4 text-blue-600" />
          </ActionButton>
          <ActionButton variant="outline" size="icon" onClick={onEdit} aria-label={t("templates.actions.edit")}>
            <Pencil className="h-4 w-4" />
          </ActionButton>
          <ActionButton
            variant="outline"
            size="icon"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isDeleting}
            aria-label={t("templates.actions.delete")}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </ActionButton>
        </div>
      </TableCell>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={t("templates.delete")}
        description={t("templates.deleteConfirm", { name: template.name })}
      />
    </TableRow>
  )
}
