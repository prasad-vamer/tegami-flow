export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  portfolioUrl: string | null;
  referenceUrl: string | null;
  metadata: any | null; // Added but will be ignored as requested
}

export type CandidateCreateInput = Omit<
  Candidate,
  "id" | "createdAt" | "updatedAt" | "metadata"
>;
export type CandidateUpdateInput = Partial<CandidateCreateInput>;

export type CandidateSortField = "name" | "email" | "position" | "createdAt";
export type SortOrder = "asc" | "desc";

export interface CandidateQueryParams {
  q?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CandidateResponse {
  data: Candidate[];
  pagination: PaginationInfo;
}
