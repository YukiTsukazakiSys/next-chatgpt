import { atom } from 'recoil';

export const promptMsgAtom = atom<string>({
  key: 'promptMsg',
  default: '',
});
