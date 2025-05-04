export interface CreateEmailLogInput {
  toEmail: string;
  subject: string;
  body: string;
  status: string;
  error?: string;
  templateId?: string;
  candidateId?: string;
}
