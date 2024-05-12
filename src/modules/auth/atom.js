import { atom, selector, selectorFamily } from 'recoil';

import * as Fetch from './fetch';

export const accessTokenAtom = atom({
  key: 'ACCESSTOKEN',
  default: {
    accessToken: '',
  },
});

export const loginAtom = selectorFamily({
  key: 'GET__AUTH',
  get:
    body =>
    async ({ get, set }) => {
      try {
        console.log('🚀 ~ response:', body);
        // const response = await Fetch.login(body);

        // return response;
      } catch (err) {
        throw err;
      }
    },
  set: ({ get, set }, newValue) => {},
});

export const setAccessTokenAtom = selector({
  key: 'SET_AUTH',
  get: ({ get }) => {},
  set: ({ set }, newValue) => {
    set(accessTokenAtom, newValue);
  },
});
