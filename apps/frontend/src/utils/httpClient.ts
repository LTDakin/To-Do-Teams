import { userAtom } from "../state/user";

import { createStore } from "jotai";

const userStore = createStore();
const serverURL = "http://localhost:3000/"; // TODO use env instead of hardcoding when deploying

// Handles the actual connection to the backend API used for making requests
async function fetchData(url: string) {
  const user = userStore.get(userAtom);
  const headers: Record<string, string> = {};
  if (user?.accessToken) {
    headers["Authorization"] = `Bearer ${user.accessToken}`;
  }
  const response = await fetch(serverURL + url, { headers });
  if (!response.ok) {
    const errorResponse = await response.json().catch(() => null);
    const errorMessage =
      errorResponse?.message || "Network response was not ok";
    throw new Error(errorMessage);
  }
  return await response.json();
}

async function postData(url: string, data: any) {
  const user = userStore.get(userAtom);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (user?.accessToken) {
    headers["Authorization"] = `Bearer ${user.accessToken}`;
  }
  const response = await fetch(serverURL + url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorResponse = await response.json().catch(() => null);
    const errorMessage =
      errorResponse?.message || "Network response was not ok";
    throw new Error(errorMessage);
  }
  return await response.json();
}

export { fetchData, postData };
