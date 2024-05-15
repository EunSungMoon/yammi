import { atom, selector, selectorFamily } from 'recoil';

import * as Fetch from './fetch';

export const randomRestaurantAtom = atom({
  key: 'RANDOM_RESTAURANT',
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

export const restaurantListAtom = atom({
  key: 'RESTAURANT',
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

export const topSelectedRestaurantListAtom = atom({
  key: 'TOP_SELECTED_RESTAURANT_LIST',
  default: [
    {
      id: 0,
      average_star: 0,
      review_count: 0,
      category1: {
        id: 0,
        name: '',
      },
      category2: {
        id: 0,
        name: '',
      },
      name: '',
      image: 'https://picsum.photos/200',
      address: '',
      counter: 0,
    },
  ],
});

export const searchResultListAtom = atom({
  key: 'SEARCH_RESULT_LIST',
  default: {
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        id: 0,
        average_star: null,
        review_count: 0,
        category1: {
          id: 1,
          name: '',
        },
        category2: {
          id: 1,
          name: '',
        },
        name: '',
        image: 'https://picsum.photos/200',
        address: '',
        counter: 0,
      },
    ],
  },
});

export const setRandomRestaurantAtom = selector({
  key: 'SET__RANDOM_RESTAURANT',
  get: ({ get }) => {
    const randomRestaurant = get(randomRestaurantAtom);
  },
  set: ({ get, set }, newValue) => {
    set(randomRestaurantAtom, newValue);
  },
});

export const getRandomRestaurantAtom = selectorFamily({
  key: 'GET__RANDOM_RESTAURANT',
  get:
    query =>
    async ({ get }, option) => {
      try {
        const response = await Fetch.getRandomRestaurant(query);

        return response;
      } catch (err) {
        throw err;
      }
    },
  set:
    id =>
    ({ set, get }, newValue) => {},
});

export const setRestaurantListAtom = selector({
  key: 'SET__RESTAURANT',
  get: ({ get }) => {
    const restaurantList = get(restaurantListAtom);
  },
  set: ({ get, set }, newValue) => {
    set(restaurantListAtom, newValue);
  },
});

export const setTopSelectedRestaurantListAtom = selector({
  key: 'SET__TOP_SELECTED_RESTAURANT',
  get: ({ get }) => {},
  set: ({ get, set }, newValue) => {
    set(topSelectedRestaurantListAtom, newValue);
  },
});

export const setSearchResultLisAtom = selector({
  key: 'SET__SEARCH_RESULT_LIST',
  get: ({ get }) => {},
  set: ({ get, set }, newValue) => {
    set(searchResultListAtom, newValue);
  },
});
