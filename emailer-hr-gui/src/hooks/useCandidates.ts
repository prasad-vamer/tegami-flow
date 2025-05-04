import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import type {
  Candidate,
  CandidateUpdateInput,
  CandidateSortField,
  SortOrder,
  CandidateQueryParams,
  PaginationInfo,
  CandidateResponse,
} from "src/types/candidate";
import { toast } from "sonner";
import { useDebounce } from "src/hooks/useDebounce";

export function useCandidates() {
  const { t } = useTranslation();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<CandidateSortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchCandidates = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const queryParams: CandidateQueryParams = {
      page,
      limit,
    };

    if (debouncedSearchQuery) {
      queryParams.q = debouncedSearchQuery;
    }

    if (sortField && sortOrder) {
      queryParams.sort = `${sortField}:${sortOrder}`;
    }

    // Convert query params to URL search params
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });

    const queryString = searchParams.toString();
    const endpoint = queryString
      ? `${ENDPOINTS.candidates.list}?${queryString}`
      : ENDPOINTS.candidates.list;

    try {
      // Updated to handle the new response format
      const response = await api.get<CandidateResponse>(endpoint);
      setCandidates(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch candidates"
      );
      toast.error(t("candidates.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery, sortField, sortOrder, page, limit, t]);

  // Function to handle sort field changes
  const handleSortFieldChange = useCallback(
    (field: CandidateSortField) => {
      if (field === sortField) {
        // If already sorting by this field, toggle the order
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      } else {
        // If sorting by a new field, set the field and default to ascending order
        setSortField(field);
        setSortOrder("asc");
      }
    },
    [sortField]
  );

  const updateCandidate = useCallback(
    async (id: string, data: CandidateUpdateInput) => {
      try {
        const updatedCandidate = await api.put<Candidate>(
          ENDPOINTS.candidates.update(id),
          data
        );

        setCandidates((prev) =>
          prev.map((candidate) =>
            candidate.id === id ? updatedCandidate : candidate
          )
        );

        toast.success(t("candidates.updateSuccess"));

        return updatedCandidate;
      } catch (err) {
        toast.error(t("error"));
        throw err;
      }
    },
    [t]
  );

  const deleteCandidate = useCallback(
    async (id: string) => {
      try {
        await api.delete(ENDPOINTS.candidates.delete(id));

        setCandidates((prev) =>
          prev.filter((candidate) => candidate.id !== id)
        );

        // Update total count in pagination
        setPagination((prev) => ({
          ...prev,
          total: Math.max(0, prev.total - 1),
        }));

        toast.success(t("candidates.deleteSuccess"));

        return true;
      } catch (err) {
        toast.error(t("error"));
        throw err;
      }
    },
    [t]
  );

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return {
    candidates,
    pagination,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    handleSortFieldChange,
    page,
    setPage,
    limit,
    setLimit,
    fetchCandidates,
    updateCandidate,
    deleteCandidate,
  };
}
