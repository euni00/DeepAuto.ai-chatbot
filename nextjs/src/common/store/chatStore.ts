import { atom } from 'jotai';

export const sessionAtom = atom<string | null>(null);
export const streamedMessageAtom = atom<string>('');
