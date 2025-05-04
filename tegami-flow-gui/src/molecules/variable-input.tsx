

import { useTranslation } from "react-i18next"
import { FormLabel } from "src/atoms/form-label"
import { FormInput } from "src/atoms/form-input"
import { FormError } from "src/atoms/form-error"

interface VariableInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  isFromCandidate?: boolean
  required?: boolean
}

export function VariableInput({
  id,
  label,
  value,
  onChange,
  error,
  isFromCandidate = false,
  required = true,
}: VariableInputProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <FormLabel htmlFor={id} required={required}>
          {label}
        </FormLabel>
        {isFromCandidate && (
          <span className="text-xs text-muted-foreground">{t("emails.variables.fromCandidate")}</span>
        )}
      </div>

      <FormInput
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
        disabled={isFromCandidate}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />

      {error && <FormError id={`${id}-error`}>{error}</FormError>}
    </div>
  )
}
