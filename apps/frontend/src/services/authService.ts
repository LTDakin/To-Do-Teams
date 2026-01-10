// Auth Service for handling sign-in, sign-out, user session management, user retrieval, and account creation/deletion.
import { api } from "./httpClient";
import type { user } from "../types";
import Cookies from "js-cookie";
const userEndpoint = "user";

async function signin(credentials: any): Promise<user> {
  const response = await api.post(userEndpoint + "/signin", credentials);

  Cookies.set("access_token", response.accessToken, {
    secure: true,
    sameSite: "strict",
  });

  return {
    username: response.username,
    id: response.id,
    accessToken: response.accessToken,
  };
}

async function signup(newAccountData: any): Promise<user> {
  const response = await api.post(userEndpoint + "/signup", newAccountData);

  Cookies.set("access_token", response.accessToken, {
    secure: true,
    sameSite: "strict",
  });

  return {
    username: response.username,
    id: response.id,
    accessToken: response.accessToken,
  };
}

export { signin, signup };
