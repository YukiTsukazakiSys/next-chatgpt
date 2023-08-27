import { atom } from 'recoil';

export const presencePenaltyAtom = atom<number>({
  key: 'presencePenalty',
  default: 0,
});
