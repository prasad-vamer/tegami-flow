import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import { toast } from "sonner";
import type { Template } from "src/types/template";

export function useTemplateOptions() {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch all templates
        const response = await api.get<{ data: Template[] }>(
          ENDPOINTS.templates.list
        );
        setTemplates(response.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : t("templates.loadError");
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTemplates();
  }, [t]);

  return {
    templates,
    isLoading,
    error,
  };
}
