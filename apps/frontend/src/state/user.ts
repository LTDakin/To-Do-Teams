import { atom } from "jotai";

const initialUser = {
  username: "",
  id: -1,
  accessToken: "",
};

export const userAtom = atom(initialUser);
export type UserAtom = typeof initialUser;
