import { atom } from 'recoil';

export const temperatureAtom = atom<number>({
  key: 'temperature',
  default: 1,
});
