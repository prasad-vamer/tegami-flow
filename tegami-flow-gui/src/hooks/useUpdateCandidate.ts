import { useState } from "react";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import type { Candidate, CandidateUpdateInput } from "src/types/candidate";
import { toast } from "sonner";

export function useUpdateCandidate(id: string | undefined) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCandidate = async (
    data: CandidateUpdateInput
  ): Promise<Candidate | null> => {
    if (!id) {
      setError("Candidate ID is required");
      return null;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const updatedCandidate = await api.put<Candidate>(
        ENDPOINTS.candidates.update(id),
        data
      );
      toast.success("Candidate updated successfully!");
      return updatedCandidate;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update candidate";
      setError(errorMessage);
      toast.error("Failed to update candidate. Please try again.");
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateCandidate,
    isUpdating,
    error,
  };
}
