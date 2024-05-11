import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';

import PageComponent from './Page';
import { atomMapKey } from '../../../modules/atomMap';
import { setResturantListAtom } from '../../../modules/board/atom';
import { getResturantList } from '../../../modules/board/fetch';
import { setCategoriesAtom } from '../../../modules/category/atom';
import { getCategories } from '../../../modules/category/fetch';

export const getServerSideProps = async ({ req, query }) => {
  const { categoryId } = query;
  const [categories, resturantList] = await Promise.all([
    getCategories({}),
    getResturantList({ category: categoryId }),
  ]);

  return {
    props: {
      initialData: {
        [atomMapKey.category.categoriesAtom]: categories.data,
        [atomMapKey.board.resturantListAtom]: resturantList.data,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setCategories = useSetRecoilState(setCategoriesAtom);
  const setResturantList = useSetRecoilState(setResturantListAtom);

  useEffect(() => {
    setCategories(initialData.categoriesAtom);
    setResturantList(initialData.resturantListAtom);
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
