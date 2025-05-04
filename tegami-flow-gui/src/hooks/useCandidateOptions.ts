import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import { toast } from "sonner";
import type { Candidate } from "src/types/candidate";
import type { CandidateOption } from "src/types/email";

export function useCandidateOptions() {
  const { t } = useTranslation();
  const [candidates, setCandidates] = useState<CandidateOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandidates() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch all candidates
        const response = await api.get<{ data: Candidate[] }>(
          ENDPOINTS.candidates.list
        );

        // Map to options format
        const options = response.data.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          email: candidate.email,
          position: candidate.position,
        }));

        setCandidates(options);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : t("candidates.loadError");
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCandidates();
  }, [t]);

  return {
    candidates,
    isLoading,
    error,
  };
}
