

import { useTranslation } from "react-i18next"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select"
import { FormLabel } from "src/atoms/form-label"
import { FormError } from "src/atoms/form-error"
import { Skeleton } from "@/shadcn/components/ui/skeleton"
import type { Template } from "src/types/template"

interface TemplateSelectProps {
  templates: Template[]
  value: string
  onChange: (value: string) => void
  error?: string
  isLoading?: boolean
  required?: boolean
  disabled?: boolean
}

export function TemplateSelect({
  templates,
  value,
  onChange,
  error,
  isLoading = false,
  required = true,
  disabled = false,
}: TemplateSelectProps) {
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
      <FormLabel htmlFor="template" required={required}>
        {t("emails.fields.template")}
      </FormLabel>

      <Select value={value} onValueChange={onChange} disabled={disabled || templates.length === 0}>
        <SelectTrigger id="template" className={error ? "border-destructive" : ""}>
          <SelectValue placeholder={t("emails.placeholders.selectTemplate")} />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
              {template.strict && <span className="ml-2 text-xs text-amber-500">({t("emails.strictMode")})</span>}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <FormError>{error}</FormError>}
    </div>
  )
}
