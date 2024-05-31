import { atom, selector, selectorFamily } from 'recoil';

import * as Fetch from './fetch';

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

export const userAtom = atom({
  key: 'USER',
  default: {
    email: '',
    nickname: '',
    last_update: '',
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

export const setUserAtom = selector({
  key: 'SET_USER',
  get: ({ get }) => {},
  set: ({ get, set }, newValue) => {
    set(userAtom, newValue);
  },
});
