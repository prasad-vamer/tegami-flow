

import { ArrowLeft } from "lucide-react"
import { Button } from "@/shadcn/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { SendEmailForm } from "src/organisms/send-email-form"

interface SendEmailTemplateProps {
  initialCandidateId?: string | null
  initialTemplateId?: string | null
}

export function SendEmailTemplate({ initialCandidateId, initialTemplateId }: SendEmailTemplateProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate("/logs")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("emails.back")}
        </Button>

        <h1 className="text-2xl font-bold tracking-tight">{t("emails.send.title")}</h1>
        <p className="text-muted-foreground mt-1">{t("emails.send.description")}</p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SendEmailForm initialCandidateId={initialCandidateId} initialTemplateId={initialTemplateId} />
      </div>
    </div>
  )
}
