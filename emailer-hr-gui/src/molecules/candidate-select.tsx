

import { useTranslation } from "react-i18next"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select"
import { FormLabel } from "src/atoms/form-label"
import { FormError } from "src/atoms/form-error"
import { Skeleton } from "@/shadcn/components/ui/skeleton"
import type { CandidateOption } from "src/types/email"

interface CandidateSelectProps {
  candidates: CandidateOption[]
  value: string
  onChange: (value: string) => void
  error?: string
  isLoading?: boolean
  required?: boolean
  disabled?: boolean
}

export function CandidateSelect({
  candidates,
  value,
  onChange,
  error,
  isLoading = false,
  required = true,
  disabled = false,
}: CandidateSelectProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <FormLabel htmlFor="candidate" required={required}>
        {t("emails.fields.candidate")}
      </FormLabel>

      <Select value={value} onValueChange={onChange} disabled={disabled || candidates.length === 0}>
        <SelectTrigger id="candidate" className={error ? "border-destructive" : ""}>
          <SelectValue placeholder={t("emails.placeholders.selectCandidate")} />
        </SelectTrigger>
        <SelectContent>
          {candidates.map((candidate) => (
            <SelectItem key={candidate.id} value={candidate.id}>
              {candidate.name} ({candidate.email})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <FormError>{error}</FormError>}
    </div>
  )
}
