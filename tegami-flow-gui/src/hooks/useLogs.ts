import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import type {
  EmailLog,
  LogSortField,
  SortOrder,
  LogQueryParams,
  PaginationInfo,
  LogsResponse,
} from "src/types/log";
import { toast } from "sonner";
import { useDebounce } from "src/hooks/useDebounce";

export function useLogs() {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<LogSortField>("sentAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const queryParams: LogQueryParams = {
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
      ? `${ENDPOINTS.logs.list}?${queryString}`
      : ENDPOINTS.logs.list;

    try {
      const response = await api.get<LogsResponse>(endpoint);
      setLogs(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch logs");
      toast.error(t("logs.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery, sortField, sortOrder, page, limit, t]);

  // Function to handle sort field changes
  const handleSortFieldChange = useCallback(
    (field: LogSortField) => {
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

  // Function to handle sort selection from dropdown
  const handleSortSelection = useCallback((value: string) => {
    const [field, order] = value.split(":");
    setSortField(field as LogSortField);
    setSortOrder(order as SortOrder);
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    pagination,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    handleSortFieldChange,
    handleSortSelection,
    page,
    setPage,
    limit,
    setLimit,
    fetchLogs,
  };
}
