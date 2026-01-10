import { atomWithStorage } from "jotai/utils";

export interface UserData {
  username: string;
  id: number;
}

export const initialUser: UserData = {
  username: "",
  id: -1,
};

export const userAtom = atomWithStorage<UserData>("user-data", initialUser);
