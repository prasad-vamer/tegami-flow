// src/config/api.config.ts
interface ApiConfig {
  baseUrl: string;
  version: string;
  timeout: number;
  headers: Record<string, string>;
}

// Default configuration
const defaultConfig: ApiConfig = {
  baseUrl: "http://localhost:3000",
  version: "v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
};

// Environment-specific configurations
const configs: Record<string, Partial<ApiConfig>> = {
  development: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  },
  production: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
    timeout: 60000,
  },
  test: {
    baseUrl: "http://localhost:3001",
  },
};

// Determine current environment
const environment = import.meta.env.MODE || "development";

// Create the final config by merging default with environment-specific
export const apiConfig: ApiConfig = {
  ...defaultConfig,
  ...configs[environment],
};

export default apiConfig;
