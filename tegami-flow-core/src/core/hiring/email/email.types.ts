export interface SendEmailInput {
  toEmail: string;
  subject: string;
  body: string;
  templateId?: string;
  candidateId?: string;
}
