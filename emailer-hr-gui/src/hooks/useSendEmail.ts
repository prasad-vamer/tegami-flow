import { useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import { toast } from "sonner";
import type { SendEmailRequest, SendEmailResponse } from "src/types/email";

export function useSendEmail() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (data: SendEmailRequest): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      await api.post<SendEmailResponse>(ENDPOINTS.emails.send, data);
      toast.success(t("emails.success"));
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t("emails.error");
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    sendEmail,
    isSubmitting,
    error,
    setError,
  };
}
