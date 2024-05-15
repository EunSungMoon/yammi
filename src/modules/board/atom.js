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

export const myBookmarkedListAtom = atom({
  key: 'MY_BOOKMARKED_LIST',
  default: {
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        id: 0,
        restaurant: {
          category1: {
            id: 0,
            name: '',
          },
          category2: null,
          name: '',
          image: 'https://picsum.photos/200',
          address: '',
          counter: 0,
        },
      },
    ],
  },
});

export const myReviewListAtom = atom({
  key: 'MY_REVIEWED_LIST',
  default: {
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        id: 0,
        restaurant: {
          id: 0,
          category1: {
            id: 0,
            name: '',
          },
          category2: null,
          name: '',
          image: 'https://picsum.photos/200',
          address: '',
          counter: 0,
        },
        comment: '',
        star: 0,
        created_date: '',
        updated_date: '',
        user: 0,
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

export const setMyBookmarkedListAtom = selector({
  key: 'SET__MY_BOOKMARKED_LIST',
  get: ({ get }) => {
    const myBookmarkedList = get(myBookmarkedListAtom);
  },
  set: ({ get, set }, newValue) => {
    set(myBookmarkedListAtom, newValue);
  },
});

export const setMyReviewedListAtom = selector({
  key: 'SET__MY_REVIEWED_LIST',
  get: ({ get }) => {
    const myReviewList = get(myReviewListAtom);
  },
  set: ({ get, set }, newValue) => {
    set(myReviewListAtom, newValue);
  },
});
