"use client"

import { useTranslation } from "react-i18next"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shadcn/components/ui/dialog"
import { Button } from "@/shadcn/components/ui/button"
import { StatusBadge } from "src/atoms/status-badge"
import type { EmailLog } from "src/types/log"

interface LogDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  log: EmailLog
}

export function LogDetailsDialog({ isOpen, onClose, log }: LogDetailsDialogProps) {
  const { t } = useTranslation()
  const formattedDate = log.sentAt ? format(new Date(log.sentAt), "PPpp") : "N/A"

  // Convert newlines to HTML line breaks
  const formatWithLineBreaks = (text: string): string => {
    return text.replace(/\n/g, "<br />")
  }

  // Format the email body with line breaks
  const formattedBody = formatWithLineBreaks(log.body || "")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{t("logs.details.title")}</DialogTitle>
          <DialogDescription>{t("logs.details.description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4 overflow-y-auto pr-2">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{t("logs.fields.status")}</p>
              <StatusBadge status={log.status} />
            </div>
            <div className="space-y-1 col-span-2">
              <p className="text-sm font-medium text-muted-foreground">{t("logs.fields.sentAt")}</p>
              <p>{formattedDate}</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{t("logs.fields.candidate")}</p>
            <p>{log.candidate.name}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{t("logs.fields.template")}</p>
            <p>{log.template.name}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{t("logs.fields.to")}</p>
            <p>{log.toEmail}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{t("logs.fields.subject")}</p>
            <p>{log.subject}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{t("logs.fields.body")}</p>
            <div
              className="prose prose-sm max-w-none bg-muted-foreground/10 p-3 rounded max-h-[300px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: formattedBody }}
            />
          </div>

          {log.error && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-destructive">{t("logs.fields.error")}</p>
              <div className="bg-destructive/10 p-3 rounded-md text-sm text-destructive">{log.error}</div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-shrink-0">
          <Button onClick={onClose}>{t("common.close")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
