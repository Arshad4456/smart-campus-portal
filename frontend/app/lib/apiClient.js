// frontend/app/lib/apiClient.js
import axios from "axios";

export const API_BASE = "http://localhost:5000/api/users";

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("scp_token");
};

// fetch helper (with token)
export async function authFetch(url, options = {}) {
  const token = getToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return res;
}

// axios instance (with token)
export const api = axios.create();

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
