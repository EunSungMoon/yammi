import { atom, selector, selectorFamily, useRecoilState } from 'recoil';

import * as Fetch from './fetch';

export const itemAtom = atom({
  key: 'ITEM',
  default: { title: '', content: '' },
});

export const getItemAtom = selectorFamily({
  key: 'GET_ITEM',
  get:
    query =>
    async ({ get, set }, option) => {
      const response = await Fetch.getItems({ ...query });

      return response;
    },

  set: ({ get, set }, newValue) => {
    set(itemAtom, newValue);
  },
});

export const setItemAtom = selector({
  key: 'SET_ITEM',
  get: ({ get }) => {
    const item = get(itemAtom);
    return item;
  },
  set: ({ get, set }, newValue) => {
    set(itemAtom, newValue);
  },
});
