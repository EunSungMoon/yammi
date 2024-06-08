import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';
import { Constant, CookieGetter } from '@system/cookie';

import PageComponent from './Page';
import { atomMapKey } from '../../../modules/atomMap';
import { setAccessTokenAtom } from '../../../modules/auth/atom';
import { setRestaurantListAtom } from '../../../modules/board/atom';
import { getRestaurantList } from '../../../modules/board/fetch';
import { setCategoriesAtom } from '../../../modules/category/atom';
import { getCategories } from '../../../modules/category/fetch';

export const getServerSideProps = async ({ req, query }) => {
  const cookieGetter = new CookieGetter({ req });
  const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);
  const isLoggedIn = !!accessToken;

  const { categoryId } = query;
  try {
    let token = null;
    if (isLoggedIn) {
      token = accessToken;
    }
    const [categories, restaurantList] = await Promise.all([
      getCategories({}, { accessToken }),
      getRestaurantList({ category: categoryId }, { accessToken }),
    ]);

    return {
      props: {
        initialData: {
          [atomMapKey.category.categoriesAtom]: categories,
          [atomMapKey.board.restaurantListAtom]: restaurantList,
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
  const setCategories = useSetRecoilState(setCategoriesAtom);
  const setRestaurantList = useSetRecoilState(setRestaurantListAtom);
  const setAccessToken = useSetRecoilState(setAccessTokenAtom);

  useEffect(() => {
    setCategories(initialData[atomMapKey.category.categoriesAtom]);
    setRestaurantList(initialData[atomMapKey.board.restaurantListAtom]);
    setAccessToken(initialData[atomMapKey.auth.accessTokenAtom]);
  }, []);

  return (
    <Wrapper>
      <Gnb title="카테고리" isBack />
      <PageComponent />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Page;
