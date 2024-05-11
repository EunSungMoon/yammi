import { atom, selector, selectorFamily } from 'recoil';

import * as Fetch from './fetch';

export const randomResturantAtom = atom({
  key: 'RANDOM_RESTURANT',
  default: {
    id: 0,
    average_star: null,
    review_count: 0,
    category1: {
      id: 0,
      name: '',
    },
    category2: null,
    name: '',
    image: '',
    address: '',
    counter: 0,
  },
});

export const resturantListAtom = atom({
  key: 'RESTURANT',
  default: {
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        id: 0,
        average_star: 0,
        review_count: 0,
        category1: {
          id: 0,
          name: '',
        },
        category2: null,
        name: '',
        image: '',
        address: '',
        counter: 0,
      },
    ],
  },
});

export const setRandomResturantAtom = selector({
  key: 'SET__RANDOM_RESTURANT',
  get: ({ get }) => {
    const randomResturant = get(randomResturantAtom);
  },
  set: ({ get, set }, newValue) => {
    set(randomResturantAtom, newValue);
  },
});

export const getRandomResturantAtom = selectorFamily({
  key: 'GET__RANDOM_RESTURANT',
  get:
    query =>
    async ({ get }, option) => {
      try {
        const response = await Fetch.getRandomResturant(query);

        return response;
      } catch (err) {
        throw err;
      }
    },
  set:
    id =>
    ({ set, get }, newValue) => {},
});

export const setResturantListAtom = selector({
  key: 'SET__RESTURANT',
  get: ({ get }) => {
    const resturantList = get(resturantListAtom);
  },
  set: ({ get, set }, newValue) => {
    set(resturantListAtom, newValue);
  },
});
