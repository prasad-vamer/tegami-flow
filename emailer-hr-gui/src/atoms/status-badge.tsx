

import { useTranslation } from "react-i18next"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/shadcn//lib/utils"

interface StatusBadgeProps {
  status: "sent" | "failed"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium",
        status === "sent" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700",
        className,
      )}
    >
      {status === "sent" ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
      <span>{status === "sent" ? t("logs.status.sent") : t("logs.status.failed")}</span>
    </div>
  )
}
