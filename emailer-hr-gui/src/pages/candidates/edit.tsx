

import { useParams } from "react-router-dom"
import { Toaster } from "sonner"
import { EditCandidateTemplate } from "src/templates/edit-candidate-template"

export default function EditCandidatePage() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div className="container mx-auto py-10">Candidate ID is required</div>
  }

  return (
    <>
      <EditCandidateTemplate candidateId={id} />
      <Toaster />
    </>
  )
}
