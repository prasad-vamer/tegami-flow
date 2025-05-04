import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import { toast } from "sonner";
import type { TemplateWithContent } from "src/types/email";

export function useTemplateDetails(templateId: string | null) {
  const { t } = useTranslation();
  const [template, setTemplate] = useState<TemplateWithContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplate() {
      if (!templateId) {
        setTemplate(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await api.get<TemplateWithContent>(
          ENDPOINTS.templates.detail(templateId)
        );
        setTemplate(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : t("templates.errors.fetchFailed");
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTemplate();
  }, [templateId, t]);

  return {
    template,
    isLoading,
    error,
  };
}
