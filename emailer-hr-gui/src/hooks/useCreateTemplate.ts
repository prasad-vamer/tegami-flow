import { useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import { toast } from "sonner";
import type { Template } from "src/types/template";

export interface TemplateFormData {
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

export function useCreateTemplate() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (data: TemplateFormData): FormErrors => {
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

  const createTemplate = async (
    data: TemplateFormData
  ): Promise<Template | null> => {
    // Validate form
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return null;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await api.post<Template>(
        ENDPOINTS.templates.create,
        data
      );
      toast.success(t("templates.createSuccess"));
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t("templates.createError");
      toast.error(errorMessage);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createTemplate,
    isSubmitting,
    errors,
    setErrors,
  };
}
