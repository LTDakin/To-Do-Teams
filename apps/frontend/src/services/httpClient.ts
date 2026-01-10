import Cookies from "js-cookie";

const serverURL = "http://localhost:3000"; // TODO use env instead of hardcoding when deploying
const authToken = () => Cookies.get("access_token");

async function apiRequest(url: string, method: string = "GET", data?: any) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authToken()) {
    headers["Authorization"] = `Bearer ${authToken()}`;
  }

  // replace safely joins the url
  const response = await fetch(`${serverURL}/${url.replace(/^\//, "")}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const errorResponse = await response.json().catch(() => null);
    throw new Error(
      errorResponse?.message || `Request failed with status ${response.status}`
    );
  }

  // Some DELETE responses are empty (204 No Content)
  if (response.status === 204) return null;

  return await response.json();
}

export const api = {
  get: (url: string) => apiRequest(url, "GET"),
  post: (url: string, data: any) => apiRequest(url, "POST", data),
  put: (url: string, data: any) => apiRequest(url, "PUT", data),
  patch: (url: string, data: any) => apiRequest(url, "PATCH", data),
  delete: (url: string) => apiRequest(url, "DELETE"),
};
