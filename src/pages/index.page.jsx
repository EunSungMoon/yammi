import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';

import PageComponent from './Page';
import { atomMapKey } from '../modules/atomMap';
import { setCategoriesAtom } from '../modules/category/atom';
import { getCategories } from '../modules/category/fetch';

export const getServerSideProps = async ({ req }) => {
  const [categories] = await Promise.all([getCategories({})]);

  return {
    props: {
      initialData: {
        [atomMapKey.category.categoriesAtom]: categories.data,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setCategories = useSetRecoilState(setCategoriesAtom);

  useEffect(() => {
    setCategories(initialData.categoriesAtom);
  }, []);

  return (
    <Wrapper>
      <Gnb isMenu isLogo />
      <PageComponent />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Page;
