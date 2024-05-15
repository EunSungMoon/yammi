import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';

import PageComponent from './Page';
import { atomMapKey } from '../../modules/atomMap';
import { setRandomRestaurantAtom } from '../../modules/board/atom';
import { getRandomRestaurant } from '../../modules/board/fetch';

export const getServerSideProps = async ({ req, query }) => {
  const [randomRestaurant] = await Promise.all([
    getRandomRestaurant({ category: query.category }),
  ]);

  return {
    props: {
      initialData: {
        [atomMapKey.board.randomRestaurantAtom]: randomRestaurant.data,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setRandomRestaurant = useSetRecoilState(setRandomRestaurantAtom);

  useEffect(() => {
    setRandomRestaurant(initialData.randomRestaurantAtom);
  }, []);

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
