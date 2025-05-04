

import type React from "react"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/shadcn/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/shadcn/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Separator } from "@/shadcn/components/ui/separator"
import { CandidateSelect } from "src/molecules/candidate-select"
import { TemplateSelect } from "src/molecules/template-select"
import { VariableInput } from "src/molecules/variable-input"
import { TemplatePreview } from "src/molecules/template-preview"
import { useCandidateOptions } from "src/hooks/useCandidateOptions"
import { useTemplateOptions } from "src/hooks/useTemplateOptions"
import { useCandidateDetails } from "src/hooks/useCandidateDetails"
import { useTemplateDetails } from "src/hooks/useTemplateDetails"
import { useSendEmail } from "src/hooks/useSendEmail"
import {
  extractTemplateVariables,
  isVariableFromCandidate,
  getCandidateValueForVariable,
} from "src/utils/template-utils"
import type { EmailVariable, SendEmailRequest } from "src/types/email"

interface SendEmailFormProps {
  initialCandidateId?: string | null
  initialTemplateId?: string | null
}

export function SendEmailForm({ initialCandidateId, initialTemplateId }: SendEmailFormProps) {
  const { t } = useTranslation()

  // Form state
  const [candidateId, setCandidateId] = useState(initialCandidateId || "")
  const [templateId, setTemplateId] = useState(initialTemplateId || "")
  const [variables, setVariables] = useState<EmailVariable[]>([])
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Fetch options for dropdowns
  const { candidates, isLoading: isLoadingCandidates } = useCandidateOptions()
  const { templates, isLoading: isLoadingTemplates } = useTemplateOptions()

  // Fetch details when selected
  const { candidate, isLoading: isLoadingCandidate } = useCandidateDetails(candidateId)
  const { template, isLoading: isLoadingTemplate } = useTemplateDetails(templateId)

  // Email sending
  const { sendEmail, isSubmitting, error: sendError } = useSendEmail()

  // Set initial values from props
  useEffect(() => {
    if (initialCandidateId) {
      setCandidateId(initialCandidateId)
    }
    if (initialTemplateId) {
      setTemplateId(initialTemplateId)
    }
  }, [initialCandidateId, initialTemplateId])

  // Extract variables when template changes
  useEffect(() => {
    if (template && candidate) {
      const extractedVars = extractTemplateVariables(template)

      const newVariables = extractedVars.map((key) => {
        const isFromCandidate = isVariableFromCandidate(key)
        const value = isFromCandidate ? getCandidateValueForVariable(candidate, key) : ""

        return {
          key,
          value,
          isFromCandidate,
        }
      })

      setVariables(newVariables)
    } else {
      setVariables([])
    }
  }, [template, candidate])

  // Handle variable change
  const handleVariableChange = (key: string, value: string) => {
    setVariables((prev) => prev.map((variable) => (variable.key === key ? { ...variable, value } : variable)))

    // Clear error for this field
    if (formErrors[key]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[key]
        return newErrors
      })
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!candidateId) {
      errors.candidate = t("emails.errors.candidateRequired")
    }

    if (!templateId) {
      errors.template = t("emails.errors.templateRequired")
    }

    // Check if all variables have values only in strict mode
    if (isStrictMode) {
      variables.forEach((variable) => {
        if (!variable.value.trim()) {
          errors[variable.key] = t("emails.errors.variableRequired")
        }
      })
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Prepare data for API
    const variableData: Record<string, string> = {}
    variables.forEach((variable) => {
      variableData[variable.key] = variable.value
    })

    const requestData: SendEmailRequest = {
      candidateId,
      templateId,
      data: variableData,
    }

    const success = await sendEmail(requestData)

    if (success) {
      // Reset form on success
      setCandidateId("")
      setTemplateId("")
      setVariables([])
      setFormErrors({})
    }
  }

  // Create a variables object for preview
  const variablesForPreview = variables.reduce(
    (acc, variable) => {
      acc[variable.key] = variable.value
      return acc
    },
    {} as Record<string, string>,
  )

  // Check if template has strict mode enabled
  const isStrictMode = template?.strict || false

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {sendError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("common.error")}</AlertTitle>
          <AlertDescription>{sendError}</AlertDescription>
        </Alert>
      )}

      {isStrictMode && (
        <Alert variant="destructive" className="bg-amber-50 text-amber-800 border-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("emails.strictMode")}</AlertTitle>
          <AlertDescription>{t("emails.strictModeDescription")}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <CandidateSelect
            candidates={candidates}
            value={candidateId}
            onChange={setCandidateId}
            error={formErrors.candidate}
            isLoading={isLoadingCandidates}
            disabled={isSubmitting}
          />

          <TemplateSelect
            templates={templates}
            value={templateId}
            onChange={setTemplateId}
            error={formErrors.template}
            isLoading={isLoadingTemplates}
            disabled={isSubmitting}
          />

          {variables.length > 0 && (
            <>
              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t("emails.fields.variables")}</h3>

                {variables.map((variable) => (
                  <VariableInput
                    key={variable.key}
                    id={variable.key}
                    label={variable.key}
                    value={variable.value}
                    onChange={(value) => handleVariableChange(variable.key, value)}
                    error={formErrors[variable.key]}
                    isFromCandidate={variable.isFromCandidate}
                    required={isStrictMode}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <TemplatePreview template={template} isLoading={isLoadingTemplate} variables={variablesForPreview} />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting || isLoadingCandidate || isLoadingTemplate}>
          {isSubmitting ? t("emails.actions.sending") : t("emails.actions.send")}
        </Button>
      </div>
    </form>
  )
}
