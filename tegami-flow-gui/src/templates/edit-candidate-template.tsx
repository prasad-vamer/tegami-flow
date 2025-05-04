

import { ArrowLeft } from "lucide-react"
import { Button } from "@/shadcn/components/ui/button"
import { CandidateForm } from "src/organisms/candidate-form"
import { useNavigate } from "react-router-dom"
import { useCandidate } from "src/hooks/useCandidate"
import { Skeleton } from "@/shadcn/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/shadcn/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface EditCandidateTemplateProps {
  candidateId: string
  onSuccess?: () => void
}

export function EditCandidateTemplate({ candidateId, onSuccess }: EditCandidateTemplateProps) {
  const navigate = useNavigate()
  const { candidate, isLoading, error } = useCandidate(candidateId)

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate("/candidates")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Candidates
        </Button>

        <h1 className="text-2xl font-bold tracking-tight">Edit Candidate</h1>
        <p className="text-muted-foreground mt-1">Update candidate information</p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        ) : candidate ? (
          <CandidateForm
            defaultValues={{
              name: candidate.name,
              email: candidate.email,
              position: candidate.position,
            }}
            isEdit={true}
            candidateId={candidateId}
            onSuccess={onSuccess}
          />
        ) : null}
      </div>
    </div>
  )
}
