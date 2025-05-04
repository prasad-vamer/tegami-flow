

import { useSearchParams } from "react-router-dom"
import { Toaster } from "sonner"
import { SendEmailTemplate } from "src/templates/send-email-template"

export default function SendEmailPage() {
  const searchParams = useSearchParams()
  const candidateId = searchParams[0].get("candidateId")
  const templateId = searchParams[0].get("templateId")

  return (
    <>
      <SendEmailTemplate initialCandidateId={candidateId} initialTemplateId={templateId} />
      <Toaster />
    </>
  )
}
