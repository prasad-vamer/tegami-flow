import { useState } from "react"
import { useTranslation } from "react-i18next"
import { format } from "date-fns"
import { Eye, RefreshCcw } from "lucide-react"
import type { EmailLog } from "src/types/log"
import { TableCell } from "src/atoms/table-cell"
import { ActionButton } from "src/atoms/action-button"
import { StatusBadge } from "src/atoms/status-badge"
import { LogDetailsDialog } from "src/molecules/log-details-dialog"
import { useNavigate } from "react-router-dom"

interface LogRowProps {
  log: EmailLog
}

export function LogRow({ log }: LogRowProps) {
  const { t } = useTranslation()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const navigate = useNavigate()

  const formattedDate = log.sentAt ? format(new Date(log.sentAt), "MMM dd, yyyy HH:mm") : "N/A"

  // Truncate subject if it's too long
  const truncateSubject = (subject: string, maxLength = 40) => {
    return subject.length > maxLength ? `${subject.substring(0, maxLength)}...` : subject
  }

  const handleResend = () => {
    if (log.candidate?.id && log.template?.id) {
      navigate(`/emails/send?candidateId=${log.candidate.id}&templateId=${log.template.id}`)
    }
  }

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <TableCell>{log.candidate.name}</TableCell>
      <TableCell>{log.template.name}</TableCell>
      <TableCell>{log.toEmail}</TableCell>
      <TableCell title={log.subject}>{truncateSubject(log.subject)}</TableCell>
      <TableCell>
        <StatusBadge status={log.status} />
      </TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {log.candidate?.id && log.template?.id && (
            <ActionButton
              variant="outline"
              size="icon"
              onClick={handleResend}
              aria-label={t("logs.actions.resend")}
              title={t("logs.actions.resend")}
            >
              <RefreshCcw className="h-4 w-4 text-blue-600" />
            </ActionButton>
          )}
          <ActionButton
            variant="outline"
            size="icon"
            onClick={() => setIsDetailsOpen(true)}
            aria-label={t("logs.actions.view")}
          >
            <Eye className="h-4 w-4" />
          </ActionButton>
        </div>
      </TableCell>

      <LogDetailsDialog isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} log={log} />
    </tr>
  )
}
