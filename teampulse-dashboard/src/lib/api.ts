export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090";

export const ENDPOINTS = {
  health:      `${API_BASE}/health`,
  brief:       `${API_BASE}/brief`,
  briefStream: `${API_BASE}/brief/stream`,
} as const;
