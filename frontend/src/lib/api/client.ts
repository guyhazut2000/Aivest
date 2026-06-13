import axios, { type AxiosError, isAxiosError } from "axios";

import type { ApiError } from "./types";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const apiClient = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  // Server-side: use getClerkAccessToken() from @/lib/auth/session and set Authorization.
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const normalized: ApiError = {
      message: "Request failed",
      status: error.response?.status,
      code: error.code,
    };

    if (isAxiosError(error)) {
      normalized.message =
        error.response?.data?.message ?? error.message ?? normalized.message;
    }

    if (process.env.NODE_ENV === "development") {
      console.error("[apiClient]", normalized);
    }

    return Promise.reject(normalized);
  },
);
