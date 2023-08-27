import { atom } from 'recoil';

export const topPAtom = atom<number>({
  key: 'top_p',
  default: 1,
});
