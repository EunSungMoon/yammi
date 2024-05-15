import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';
import { Constant, CookieGetter } from '@system/cookie';

import PageComponent from './Page';
import { atomMapKey } from '../../../modules/atomMap';
import { setRestaurantListAtom } from '../../../modules/board/atom';
import { getRestaurantList } from '../../../modules/board/fetch';
import { setCategoriesAtom } from '../../../modules/category/atom';
import { getCategories } from '../../../modules/category/fetch';

export const getServerSideProps = async ({ req, query }) => {
  const cookieGetter = new CookieGetter({ req });
  const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);

  const { categoryId } = query;
  const [categories, restaurantList] = await Promise.all([
    getCategories({}),
    getRestaurantList({ category: categoryId }),
  ]);

  return {
    props: {
      initialData: {
        [atomMapKey.category.categoriesAtom]: categories.data,
        [atomMapKey.board.restaurantListAtom]: restaurantList.data,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setCategories = useSetRecoilState(setCategoriesAtom);
  const setRestaurantList = useSetRecoilState(setRestaurantListAtom);

  useEffect(() => {
    setCategories(initialData.categoriesAtom);
    setRestaurantList(initialData.restaurantListAtom);
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
