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
import {
  setSearchResultLisAtom,
  setTopSelectedRestaurantListAtom,
} from '../../modules/board/atom';
import {
  getRestaurantListSearch,
  getSearchResult,
} from '../../modules/board/fetch';

export const getServerSideProps = async ({ req, query }) => {
  const { keyword } = query;
  // const cookieGetter = new CookieGetter({ req });
  // const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);
  // console.log('🚀 ~ getServerSideProps ~ accessToken:', accessToken);
  const [topSelectedRestaurantList, searchList] = await Promise.all([
    getRestaurantListSearch({}),
    getSearchResult({ keyword: keyword }),
  ]);
  return {
    props: {
      initialData: {
        [atomMapKey.board.topSelectedRestaurantListAtom]:
          topSelectedRestaurantList.data,
        [atomMapKey.board.searchResultListAtom]: searchList.data,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const form = useForm();
  const router = useRouter();

  const setTopSelectedRestaurantList = useSetRecoilState(
    setTopSelectedRestaurantListAtom,
  );
  const setSearchResult = useSetRecoilState(setSearchResultLisAtom);

  useEffect(() => {
    setTopSelectedRestaurantList(initialData.topSelectedRestaurantListAtom);
    setSearchResult(initialData.searchResultListAtom);
  }, []);

  const handleSearch = async data => {
    router.push({
      pathname: '/search',
      query: {
        keyword: data.keyword,
      },
    });
  };

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
