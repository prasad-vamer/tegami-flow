import type { Template } from "./template"

export interface EmailVariable {
  key: string
  value: string
  isFromCandidate: boolean
}

export interface EmailFormData {
  candidateId: string
  templateId: string
  variables: Record<string, string>
}

export interface SendEmailRequest {
  candidateId: string
  templateId: string
  data: Record<string, string>
}

export interface SendEmailResponse {
  message: string
}

export interface SendEmailError {
  message: string
}

export interface TemplateWithContent extends Template {
  body: string
}

export interface CandidateOption {
  id: string
  name: string
  email: string
  position: string
}
