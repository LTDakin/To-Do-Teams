// Auth Service for handling sign-in, sign-out, user session management, user retrieval, and account creation/deletion.
import { postData } from "../utils/httpClient";

const userEndpoint = "user";

function signin(credentials: { username: string; password: string }) {
  try {
    const response = postData(userEndpoint + "/signin", credentials);
    console.log("login response", response);
    // TODO store login credentials in a jotai atom, learn how nestjs handles auth
  } catch (error) {
    console.error(error);
  }
}

function signup(newAccountData: any) {
  try {
    const response = postData(userEndpoint + "/signup", newAccountData);
    console.log("create account response", response);
  } catch (error) {
    console.error(error);
  }
}

export { signin, signup };
