// src/lib/api.ts
import apiConfig from "src/config/api.config";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

export async function fetchApi<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, body } = options;

  // Construct the full URL
  const fullUrl = url.startsWith("http")
    ? url
    : `${apiConfig.baseUrl}${url.startsWith("/") ? url : `/${url}`}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);

  try {
    const requestOptions: RequestInit = {
      method,
      headers: {
        ...apiConfig.headers,
        ...headers,
      },
      signal: controller.signal,
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    const response = await fetch(fullUrl, requestOptions);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `API request failed with status ${response.status}`
      );
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  get: <T>(url: string, options?: Omit<RequestOptions, "method" | "body">) =>
    fetchApi<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, body: any, options?: Omit<RequestOptions, "method">) =>
    fetchApi<T>(url, { ...options, method: "POST", body }),

  put: <T>(url: string, body: any, options?: Omit<RequestOptions, "method">) =>
    fetchApi<T>(url, { ...options, method: "PUT", body }),

  delete: <T>(url: string, options?: Omit<RequestOptions, "method" | "body">) =>
    fetchApi<T>(url, { ...options, method: "DELETE" }),
};
