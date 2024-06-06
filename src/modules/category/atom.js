import { atom, selector } from 'recoil';

export const categoriesAtom = atom({
  key: 'CATEGORIES',
  default: [],
});

export const setCategoriesAtom = selector({
  key: 'SET__CATEGORIES',
  get: ({ get }) => {
    const categories = get(categoriesAtom);
    return item;
  },
  set: ({ get, set }, newValue) => {
    set(categoriesAtom, newValue);
  },
});
