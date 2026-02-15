// frontend/lib/api.ts
import { getAccessToken, clearTokens } from "./auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8005/api";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? getAccessToken() : null;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    // token inválido/expirado → limpiar para forzar login
    if (typeof window !== "undefined") clearTokens();
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error(`HTTP_${res.status}`);
  }

  return (await res.json()) as T;
}
