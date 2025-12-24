import { atom } from "jotai";

export const userAtom = atom({
  username: "unknown",
  id: -1,
  accessToken: "",
});
