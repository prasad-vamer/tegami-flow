

import { useParams } from "react-router-dom"
import { Toaster } from "sonner"
import { EditTemplateTemplate } from "src/templates/edit-template-template"

export default function EditTemplatePage() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div className="container mx-auto py-10">Template ID is required</div>
  }

  return (
    <>
      <EditTemplateTemplate templateId={id} />
      <Toaster />
    </>
  )
}
