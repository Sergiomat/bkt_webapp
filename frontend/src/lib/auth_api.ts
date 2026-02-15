// frontend/lib/auth_api.ts
import { API_BASE_URL } from "./api";
import { setTokens } from "./auth";

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("LOGIN_FAILED");

  const data = (await res.json()) as { access: string; refresh?: string };
  setTokens(data.access, data.refresh);
  return data;
}
