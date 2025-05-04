import { Candidate } from "./candidate";
import { Template } from "./template";

export interface EmailLog {
  id: string;
  toEmail: string;
  subject: string;
  status: "sent" | "failed";
  error: string | null;
  sentAt: string;
  candidate: Candidate;
  template: Template;
  body: string;
}

export type LogSortField = "sentAt" | "toEmail" | "status";
export type SortOrder = "asc" | "desc";

export interface LogQueryParams {
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

export interface LogsResponse {
  data: EmailLog[];
  pagination: PaginationInfo;
}
