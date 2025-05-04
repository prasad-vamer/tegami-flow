;
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import type {
  Candidate,
  CandidateSortField,
  SortOrder,
} from "src/types/candidate";
import { SortField, TableHeaderCell } from "src/atoms/table-header-cell";
import CandidateTableRow from "src/molecules/candidate-row";

interface CandidateTableProps {
  candidates: Candidate[];
  isLoading: boolean;
  sortField: CandidateSortField;
  sortOrder: SortOrder;
  onSort: (field: CandidateSortField) => void;
  onDelete: (id: string) => Promise<boolean>;
}

export function CandidateTable({
  candidates,
  isLoading,
  sortField,
  sortOrder,
  onSort,
  onDelete,
}: CandidateTableProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEdit = (candidate: Candidate) => {
    navigate(`/candidates/edit/${candidate.id}`);
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Failed to delete candidate:", error);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell
              sortable
              sortField="name"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort as (field: SortField) => void}
            >
              {t("candidates.fields.name")}
            </TableHeaderCell>
            <TableHeaderCell
              sortable
              sortField="email"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort as (field: SortField) => void}
            >
              {t("candidates.fields.email")}
            </TableHeaderCell>
            <TableHeaderCell
              sortable
              sortField="position"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort as (field: SortField) => void}
            >
              {t("candidates.fields.position")}
            </TableHeaderCell>
            <TableHeaderCell
              sortable
              sortField="createdAt"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort as (field: SortField) => void}
            >
              {t("candidates.fields.createdAt")}
            </TableHeaderCell>
            <TableHeaderCell>{t("common.actions")}</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`loading-${index}`}>
                {Array.from({ length: 5 }).map((_, cellIndex) => (
                  <td key={`cell-${cellIndex}`} className="p-4">
                    <Skeleton className="h-5 w-full" />
                  </td>
                ))}
              </TableRow>
            ))
          ) : candidates.length === 0 ? (
            <TableRow>
              <td colSpan={5} className="h-24 text-center">
                {t("candidates.noResults")}
              </td>
            </TableRow>
          ) : (
            candidates.map((candidate) => (
              <CandidateTableRow
                key={candidate.id}
                candidate={candidate}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

