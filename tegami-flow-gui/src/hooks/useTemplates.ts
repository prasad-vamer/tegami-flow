import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/lib/api";
import { ENDPOINTS } from "src/lib/endpoints";
import type {
  Template,
  TemplateSortField,
  SortOrder,
  TemplateQueryParams,
  PaginationInfo,
  TemplateResponse,
} from "src/types/template";
import { toast } from "sonner";
import { useDebounce } from "src/hooks/useDebounce";

export function useTemplates() {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<TemplateSortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const queryParams: TemplateQueryParams = {
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
      ? `${ENDPOINTS.templates.list}?${queryString}`
      : ENDPOINTS.templates.list;

    try {
      const response = await api.get<TemplateResponse>(endpoint);
      setTemplates(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch templates"
      );
      toast.error(t("templates.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery, sortField, sortOrder, page, limit, t]);

  // Function to handle sort field changes
  const handleSortFieldChange = useCallback(
    (field: TemplateSortField) => {
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

  const deleteTemplate = useCallback(
    async (id: string) => {
      try {
        await api.delete(ENDPOINTS.templates.delete(id));

        setTemplates((prev) => prev.filter((template) => template.id !== id));

        // Update total count in pagination
        setPagination((prev) => ({
          ...prev,
          total: Math.max(0, prev.total - 1),
        }));

        toast.success(t("templates.deleteSuccess"));

        return true;
      } catch (err) {
        toast.error(t("templates.deleteError"));
        throw err;
      }
    },
    [t]
  );

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    templates,
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
    fetchTemplates,
    deleteTemplate,
  };
}
