const DEFAULT_API_BASE_URL = "http://127.0.0.1:8080/api";

function normalizeApiBaseUrl(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) {
    return DEFAULT_API_BASE_URL;
  }

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const noTrailingSlash = withProtocol.replace(/\/+$/, "");

  return noTrailingSlash.endsWith("/api")
    ? noTrailingSlash
    : `${noTrailingSlash}/api`;
}

export const API_BASE_URL = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL);

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export function buildWebSocketUrl(
  path: string,
  queryParams?: Record<string, string>,
): string {
  const httpUrl = new URL(buildApiUrl(path));
  httpUrl.protocol = httpUrl.protocol === "https:" ? "wss:" : "ws:";

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      httpUrl.searchParams.set(key, value);
    });
  }

  return httpUrl.toString();
}
