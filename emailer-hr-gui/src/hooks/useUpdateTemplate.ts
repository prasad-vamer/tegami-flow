import { useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import { toast } from "sonner";
import type { Template } from "src/types/template";

export interface TemplateUpdateData {
  name: string;
  subject: string;
  body: string;
  strict: boolean;
}

export interface FormErrors {
  name?: string;
  subject?: string;
  body?: string;
}

export function useUpdateTemplate(id: string | undefined) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (data: TemplateUpdateData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = t("templates.form.errors.nameRequired");
    }

    if (!data.subject.trim()) {
      newErrors.subject = t("templates.form.errors.subjectRequired");
    }

    if (!data.body.trim()) {
      newErrors.body = t("templates.form.errors.bodyRequired");
    }

    return newErrors;
  };

  const updateTemplate = async (
    data: TemplateUpdateData
  ): Promise<Template | null> => {
    if (!id) {
      setErrors({ name: t("templates.errors.idRequired") });
      return null;
    }

    // Validate form
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return null;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await api.put<Template>(
        ENDPOINTS.templates.update(id),
        data
      );
      toast.success(t("templates.updateSuccess"));
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t("templates.updateError");
      toast.error(errorMessage);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    updateTemplate,
    isSubmitting,
    errors,
    setErrors,
  };
}
