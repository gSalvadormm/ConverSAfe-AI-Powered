// src/services/auth.ts
import { apiClient } from "@/utils/apiClient";

export interface RegistroData {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export async function registrarUsuario(data: RegistroData) {
  return apiClient("/auth/register", { method: "POST", body: data });
}

export async function loginUsuario(email: string, password: string) {
  return apiClient("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}
