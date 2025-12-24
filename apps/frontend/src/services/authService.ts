// Auth Service for handling sign-in, sign-out, user session management, user retrieval, and account creation/deletion.
import { postData } from "../utils/httpClient";
import { userAtom } from "../state/user";

import { createStore } from "jotai";

const userStore = createStore();
const userEndpoint = "user";

async function signin(credentials: { username: string; password: string }) {
  const response = await postData(userEndpoint + "/signin", credentials);
  // update user atom with credentials
  userStore.set(userAtom, {
    username: response.username,
    id: response.id,
    accessToken: response.accessToken,
  });
}

async function signup(newAccountData: any) {
  const response = await postData(userEndpoint + "/signup", newAccountData);
  console.log("create account response", response);
  // update user atom with credentials
  userStore.set(userAtom, {
    username: response.username,
    id: response.id,
    accessToken: response.accessToken,
  });
}

export { signin, signup };
