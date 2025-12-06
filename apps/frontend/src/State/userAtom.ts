import { atom } from 'jotai';
import { UserDto } from '../../../../packages/team-do-types/src/index.js';

// Stores the currently logged in User
export const userAtom = atom<UserDto | null>(null);
userAtom.debugLabel = 'userAtom';
