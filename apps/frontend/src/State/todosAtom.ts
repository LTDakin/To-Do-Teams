import { atom } from 'jotai';
import { TodoDto } from '../../../../packages/team-do-types/src';

// Stores a list of the User's list of todos
export const todosAtom = atom<TodoDto[]>([]);
todosAtom.debugLabel = 'todosAtom';
