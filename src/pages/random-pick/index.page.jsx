import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';

import PageComponent from './Page';
import { atomMapKey } from '../../modules/atomMap';

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      initialData: {},
    },
  };
};

const Page = ({ initialData }) => {
  const rotuer = useRouter();

  return (
    <Wrapper>
      <Gnb isBack title="랜덤 맛집 뽑기" />
      <PageComponent />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default Page;
