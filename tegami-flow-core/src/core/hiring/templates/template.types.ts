export interface CreateTemplateInput {
  name: string;
  subject: string;
  body: string;
}

export interface UpdateTemplateInput {
  name?: string;
  subject?: string;
  body?: string;
}
