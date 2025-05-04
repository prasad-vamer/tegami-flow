export interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  strict: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TemplateSortField = "name" | "createdAt";
export type SortOrder = "asc" | "desc";

export interface TemplateQueryParams {
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

export interface TemplateResponse {
  data: Template[];
  pagination: PaginationInfo;
}
