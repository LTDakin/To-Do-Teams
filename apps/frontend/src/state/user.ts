import { atom } from "jotai";

export const initialUser = {
  username: "",
  id: -1,
  accessToken: "",
};

export const userAtom = atom(initialUser);
