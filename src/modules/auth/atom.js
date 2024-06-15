import { atom, selector, selectorFamily } from 'recoil';

import * as Fetch from './fetch';

export const accessTokenAtom = atom({
  key: 'ACCESSTOKEN',
  default: {
    accessToken: null,
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

export const setSaveTokenAtom = selector({
  key: 'SET_TOKEN',
  get: ({ get }) => {},
  set: ({ set }, newValue) => {},
});

// export const loginAtom = atom(null, async (get, set, data) => {
//   try {
//     set(isLoadingAtom, true);
//     const { username, password } = data;
//     const { accessToken, idToken } = await Fetch.login({
//       username,
//       password,
//     });
//     const decodedIdToken = await jwtDecode(idToken);
//     const decodedAccessToken = await jwtDecode(accessToken);

//     const maxAge = (decodedAccessToken.exp - decodedAccessToken.iat) * 1000;

//     const setter = new CookieSetter();
//     setter.set(Constant.USER_ACCESS_TOKEN, accessToken, {
//       maxAge,
//     });

//     setter.set(
//       Constant.USER_STRINGIFIED_PROFILE,
//       JSON.stringify(decodedIdToken),
//       {
//         maxAge,
//       }
//     );

//     set(accessTokenAtom, accessToken);
//     set(decodedAccessTokenAtom, decodedAccessToken);
//     set(decodedIdTokenAtom, decodedIdToken);
//     localStorage.setItem('recentLoginAccount', data.username);
//     localStorage.removeItem('snsProvider');
//   } finally {
//     set(isLoadingAtom, false);
//   }
// });
