import { cookies } from "next/headers";

export async function serverApiCall(endpoint, options = {}) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    return { data: null, error: "API URL is not configured", status: 500 };
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": options.contentType || "application/json",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: options.cache || "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: data?.message || "Request failed",
        status: response.status,
      };
    }

    return { data, error: "", status: response.status };
  } catch {
    return { data: null, error: "Request failed", status: 500 };
  }
}

export default serverApiCall;
