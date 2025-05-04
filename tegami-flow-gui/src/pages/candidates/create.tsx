import { Toaster } from "sonner"
import { CreateCandidateTemplate } from "src/templates/create-candidate-template"

export default function CreateCandidatePage() {
  return (
    <>
      <CreateCandidateTemplate />
      <Toaster />
    </>
  )
}
