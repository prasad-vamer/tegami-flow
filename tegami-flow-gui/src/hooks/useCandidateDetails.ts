import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import { toast } from "sonner";
import type { Candidate } from "src/types/candidate";

export function useCandidateDetails(candidateId: string | null) {
  const { t } = useTranslation();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandidate() {
      if (!candidateId) {
        setCandidate(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await api.get<Candidate>(
          ENDPOINTS.candidates.detail(candidateId)
        );
        setCandidate(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : t("candidates.errors.fetchFailed");
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCandidate();
  }, [candidateId, t]);

  return {
    candidate,
    isLoading,
    error,
  };
}
