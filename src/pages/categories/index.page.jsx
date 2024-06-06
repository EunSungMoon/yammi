import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';
import { Constant, CookieGetter } from '@system/cookie';

import PageComponent from './Page';
import { atomMapKey } from '../../modules/atomMap';
import { setAccessTokenAtom } from '../../modules/auth/atom';
import { setCategoriesAtom } from '../../modules/category/atom';
import { getCategories } from '../../modules/category/fetch';

export const getServerSideProps = async ({ req }) => {
  const cookieGetter = new CookieGetter({ req });
  const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);

  const [categories] = await Promise.all([getCategories({}, { accessToken })]);

  return {
    props: {
      initialData: {
        [atomMapKey.category.categoriesAtom]: categories.data,
        [atomMapKey.auth.accessTokenAtom]: accessToken,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setCategories = useSetRecoilState(setCategoriesAtom);
  const setAccessToken = useSetRecoilState(setAccessTokenAtom);

  useEffect(() => {
    setCategories(initialData[atomMapKey.category.categoriesAtom]);
    setAccessToken(initialData[atomMapKey.auth.accessTokenAtom]);
  }, []);

  return (
    <Wrapper>
      <Gnb isMenu title="카테고리" />
      <PageComponent />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Page;
