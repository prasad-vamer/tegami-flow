export const API_BASE_URL = "/api/v1";

export const ENDPOINTS = {
  candidates: {
    list: `${API_BASE_URL}/candidates`,
    detail: (id: string) => `${API_BASE_URL}/candidates/${id}`,
    create: `${API_BASE_URL}/candidates`,
    update: (id: string) => `${API_BASE_URL}/candidates/${id}`,
    delete: (id: string) => `${API_BASE_URL}/candidates/${id}`,
  },
  templates: {
    list: `${API_BASE_URL}/templates`,
    detail: (id: string) => `${API_BASE_URL}/templates/${id}`,
    create: `${API_BASE_URL}/templates`,
    update: (id: string) => `${API_BASE_URL}/templates/${id}`,
    delete: (id: string) => `${API_BASE_URL}/templates/${id}`,
  },
  logs: {
    list: `${API_BASE_URL}/email-logs`,
    detail: (id: string) => `${API_BASE_URL}/email-logs/${id}`,
  },
  emails: {
    send: `${API_BASE_URL}/emails/send`,
  },
};
