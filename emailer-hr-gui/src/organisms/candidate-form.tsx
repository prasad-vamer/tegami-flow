

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { Button } from "@/shadcn/components/ui/button"
import { toast } from "sonner"
import { FormField } from "src/molecules/form-field"
import { api } from "src/lib/api"
import { ENDPOINTS } from "src/lib/endpoints"
import type { CandidateCreateInput } from "src/types/candidate"

interface CandidateFormProps {
  defaultValues?: CandidateCreateInput
  isEdit?: boolean
  candidateId?: string
  onSuccess?: () => void
  isLoading?: boolean
}

export function CandidateForm({
  defaultValues,
  isEdit = false,
  candidateId,
  onSuccess,
  isLoading = false,
}: CandidateFormProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [formData, setFormData] = useState<CandidateCreateInput>({
    name: "",
    email: "",
    position: "",
    portfolioUrl: null,
    referenceUrl: null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Create schema with translations
  const createCandidateSchema = () => {
    return z.object({
      name: z.string().min(1, t("candidates.form.required")),
      email: z.string().min(1, t("candidates.form.required")).email(t("candidates.form.invalidEmail")),
      position: z.string().min(1, t("candidates.form.required")),
      portfolioUrl: z.string().nullable(),
      referenceUrl: z.string().nullable(),
    })
  }

  // Update form data when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    }
  }, [defaultValues])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value || null }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    try {
      createCandidateSchema().parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (isEdit && candidateId) {
        // Update existing candidate
        await api.put(ENDPOINTS.candidates.update(candidateId), formData)
        toast.success(t("candidates.updateSuccess"))
      } else {
        // Create new candidate
        await api.post(ENDPOINTS.candidates.create, formData)
        toast.success(t("candidates.createSuccess"))

        // Reset form if not editing
        if (!isEdit) {
          setFormData({
            name: "",
            email: "",
            position: "",
            portfolioUrl: null,
            referenceUrl: null,
          })
        }
      }

      // Call onSuccess callback or navigate
      if (onSuccess) {
        onSuccess()
      } else {
        navigate("/candidates")
      }
    } catch (error) {
      console.error(`Failed to ${isEdit ? "update" : "create"} candidate:`, error)
      toast.error(t("error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* <Button type="button" variant="ghost" size="sm" className="mb-4" onClick={() => navigate("/candidates")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("candidates.form.back")}
      </Button> */}

      <FormField
        id="name"
        label={t("candidates.form.nameLabel")}
        placeholder={t("candidates.form.namePlaceholder")}
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        disabled={isSubmitting || isLoading}
      />

      <FormField
        id="email"
        label={t("candidates.form.emailLabel")}
        type="email"
        placeholder={t("candidates.form.emailPlaceholder")}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        disabled={isSubmitting || isLoading}
      />

      <FormField
        id="position"
        label={t("candidates.form.positionLabel")}
        placeholder={t("candidates.form.positionPlaceholder")}
        value={formData.position}
        onChange={handleChange}
        error={errors.position}
        required
        disabled={isSubmitting || isLoading}
      />

      <FormField
        id="portfolioUrl"
        label={t("candidates.form.portfolioLabel")}
        placeholder={t("candidates.form.portfolioPlaceholder")}
        value={formData.portfolioUrl || ""}
        onChange={handleChange}
        error={errors.portfolioUrl}
        disabled={isSubmitting || isLoading}
      />

      <FormField
        id="referenceUrl"
        label={t("candidates.form.referenceLabel")}
        placeholder={t("candidates.form.referencePlaceholder")}
        value={formData.referenceUrl || ""}
        onChange={handleChange}
        error={errors.referenceUrl}
        disabled={isSubmitting || isLoading}
      />

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/candidates")}
          disabled={isSubmitting || isLoading}
        >
          {t("common.cancel")}
        </Button>
        <Button type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting
            ? isEdit
              ? t("candidates.form.updating")
              : t("candidates.form.creating")
            : isEdit
              ? t("candidates.form.update")
              : t("candidates.form.create")}
        </Button>
      </div>
    </form>
  )
}
