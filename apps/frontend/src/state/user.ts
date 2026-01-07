import { atom } from "jotai";

export const initialUser = {
  username: "",
  id: -1,
};

export const userAtom = atom(initialUser);
