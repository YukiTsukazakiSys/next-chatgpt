import { atom } from 'recoil';

export const maxTokensAtom = atom<number>({
  key: 'maxTokens',
  default: 100,
});
