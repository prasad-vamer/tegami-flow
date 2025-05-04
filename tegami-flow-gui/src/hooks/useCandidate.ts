import { useState, useEffect } from "react";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import type { Candidate } from "src/types/candidate";
import { toast } from "sonner";

export function useCandidate(id: string | undefined) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandidate() {
      if (!id) {
        setIsLoading(false);
        setError("Candidate ID is required");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await api.get<Candidate>(ENDPOINTS.candidates.detail(id));
        setCandidate(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch candidate"
        );
        toast.error("Failed to load candidate. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCandidate();
  }, [id]);

  return {
    candidate,
    isLoading,
    error,
  };
}
