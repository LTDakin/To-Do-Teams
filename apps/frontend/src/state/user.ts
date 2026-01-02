import { atom } from "jotai";

export const userAtom = atom({
  username: "",
  id: -1,
  accessToken: "",
});
