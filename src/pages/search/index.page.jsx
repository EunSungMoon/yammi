import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Form from '@components/Form';
import Gnb from '@components/Gnb';
import { Constant, CookieGetter } from '@system/cookie';

import PageComponent from './Page';
import { atomMapKey } from '../../modules/atomMap';
import { setAccessTokenAtom } from '../../modules/auth/atom';
import {
  setSearchHistoriesAtom,
  setSearchResultLisAtom,
  setTopSelectedRestaurantListAtom,
} from '../../modules/board/atom';
import {
  getRestaurantListSearch,
  getSearchResult,
} from '../../modules/board/fetch';
import { getUser } from '../../modules/user/fetch';

export const LOCAL_STORAGE_SEARCH_HISTORIES = 'search-histories';

export const getServerSideProps = async ({ req, query }) => {
  const { keyword } = query;
  const cookieGetter = new CookieGetter({ req });
  const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);
  const isLoggedIn = !!accessToken;

  try {
    let token = null;
    if (isLoggedIn) {
      token = accessToken;
    }
    const [topSelectedRestaurantList, searchList, user] = await Promise.all([
      getRestaurantListSearch({}, { accessToken }),
      getSearchResult({ keyword: keyword }, { accessToken }),
      getUser({ accessToken }),
    ]);
    return {
      props: {
        initialData: {
          [atomMapKey.board.topSelectedRestaurantListAtom]:
            topSelectedRestaurantList,
          [atomMapKey.board.searchResultListAtom]: searchList,
          [atomMapKey.user.userAtom]: user,
          [atomMapKey.auth.accessTokenAtom]: token,
        },
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

const Page = ({ initialData }) => {
  const form = useForm();
  const router = useRouter();

  const setTopSelectedRestaurantList = useSetRecoilState(
    setTopSelectedRestaurantListAtom,
  );
  const setSearchResult = useSetRecoilState(setSearchResultLisAtom);
  const setAccessToken = useSetRecoilState(setAccessTokenAtom);
  const setSearchHistories = useSetRecoilState(setSearchHistoriesAtom);

  const handleSearch = async data => {
    const defaultValue = JSON.stringify([]);
    const resultItem = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_SEARCH_HISTORIES) || defaultValue,
    );
    const set = new Set([data.keyword, ...resultItem]);
    const unique = [...set];
    let slicedArray = [];

    if (unique.length > 5) {
      slicedArray = unique.slice(0, 5);
    } else {
      slicedArray = unique;
    }

    localStorage.setItem(
      LOCAL_STORAGE_SEARCH_HISTORIES,
      JSON.stringify(slicedArray),
    );
    router.push({
      pathname: '/search',
      query: {
        keyword: data.keyword,
      },
    });
  };

  useEffect(() => {
    setTopSelectedRestaurantList(
      initialData[atomMapKey.board.topSelectedRestaurantListAtom],
    );
    setSearchResult(initialData[atomMapKey.board.searchResultListAtom]);
    setAccessToken(initialData[atomMapKey.auth.accessTokenAtom]);
  }, []);

  useEffect(() => {
    const storedSearchHistories =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_HISTORIES)) || [];

    setSearchHistories(storedSearchHistories);
  }, [router]);

  return (
    <Wrapper>
      <Form form={form} onSubmit={form.handleSubmit(handleSearch)}>
        <Gnb isSearch isMenu searchName={'keyword'} />
      </Form>
      <PageComponent />
    </Wrapper>
  );
};

export default Page;
const Wrapper = styled.div``;
