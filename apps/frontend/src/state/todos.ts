import { atom } from "jotai";
import type { todo } from "../types";

export const todosAtom = atom<todo[]>([]);
