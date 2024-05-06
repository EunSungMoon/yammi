import { atom, selector, selectorFamily } from 'recoil';

import * as Fetch from './fetch';

export const categoriesAtom = atom({
  key: 'CATEGORIES',
  default: [],
});

export const setCategoriesAtom = selector({
  key: 'SET_CATEGORIES',
  get: ({ get }) => {
    const categories = get(categoriesAtom);
    return item;
  },
  set: ({ get, set }, newValue) => {
    set(categoriesAtom, newValue);
  },
});
