import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import { toast } from "sonner";
import type { Template } from "src/types/template";

export function useTemplate(id: string | undefined) {
  const { t } = useTranslation();
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplate() {
      if (!id) {
        setIsLoading(false);
        setError(t("templates.errors.idRequired"));
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await api.get<Template>(ENDPOINTS.templates.detail(id));
        setTemplate(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : t("templates.errors.fetchFailed");
        setError(errorMessage);
        toast.error(t("templates.errors.fetchFailed"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchTemplate();
  }, [id, t]);

  return {
    template,
    isLoading,
    error,
  };
}
