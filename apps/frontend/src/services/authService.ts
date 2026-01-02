// Auth Service for handling sign-in, sign-out, user session management, user retrieval, and account creation/deletion.
import { UserAtom } from "../state/user";
import { postData } from "../utils/httpClient";
const userEndpoint = "user";

async function signin(credentials: {
  username: string;
  password: string;
}): Promise<UserAtom> {
  const response = await postData(userEndpoint + "/signin", credentials);
  // update user atom with credentials
  return {
    username: response.username,
    id: response.id,
    accessToken: response.accessToken,
  };
}

async function signup(newAccountData: any): Promise<UserAtom> {
  const response = await postData(userEndpoint + "/signup", newAccountData);
  // update user atom with credentials
  return {
    username: response.username,
    id: response.id,
    accessToken: response.accessToken,
  };
}

export { signin, signup };
