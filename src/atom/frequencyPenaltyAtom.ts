import { atom } from 'recoil';

export const frequencyPenaltyAtom = atom<number>({
  key: 'frequencyPenalty',
  default: 0,
});
