;

import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Plus, RefreshCw, Search } from "lucide-react";
import type {
  Candidate,
  CandidateSortField,
  SortOrder,
  PaginationInfo,
} from "src/types/candidate";
import { CandidateTable } from "src/organisms/candidate-table";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";

interface CandidateListTemplateProps {
  candidates: Candidate[];
  pagination: PaginationInfo;
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortField: CandidateSortField;
  sortOrder: SortOrder;
  onSortFieldChange: (field: CandidateSortField) => void;
  page: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  onRefresh: () => void;
  onDelete: (id: string) => Promise<boolean>;
}

export function CandidateListTemplate({
  candidates,
  pagination,
  isLoading,
  searchQuery,
  onSearchChange,
  sortField,
  sortOrder,
  onSortFieldChange,
  page,
  onPageChange,
  limit,
  onLimitChange,
  onRefresh,
  onDelete,
}: CandidateListTemplateProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Handle sort toggle
  const handleSort = (field: CandidateSortField) => {
    if (field === sortField) {
      // If already sorting by this field, toggle the order
      onSortFieldChange(field);
    } else {
      // If sorting by a new field, set the field and default to ascending order
      onSortFieldChange(field);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("candidates.title")}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {t("candidates.refresh")}
          </Button>
          <Button 
            size="sm" 
            onClick={() => navigate("/candidates/create")} 
            className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("candidates.add")}
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("candidates.search")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <CandidateTable
        candidates={candidates}
        isLoading={isLoading}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        onDelete={onDelete}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t("pagination.itemsPerPage")}
          </span>
          <Select
            value={String(limit)}
            onValueChange={(value) => onLimitChange(Number(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {t("candidates.pagination.showing", {
                count: candidates.length,
                total: pagination.total,
              })}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1 || isLoading}
                className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100 disabled:text-gray-500"
              >
                {t("candidates.pagination.previous")}
              </Button>
              <div className="flex items-center gap-1">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    disabled={isLoading}
                    className={`w-8 h-8 p-0 ${
                      pageNum === page 
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                        : "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100"
                    }`}
                  >
                    {pageNum}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= pagination.totalPages || isLoading}
              >
                {t("candidates.pagination.next")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
