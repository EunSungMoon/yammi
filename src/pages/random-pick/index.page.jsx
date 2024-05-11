import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';

import PageComponent from './Page';
import { atomMapKey } from '../../modules/atomMap';
import { setRandomResturantAtom } from '../../modules/board/atom';
import { getRandomResturant } from '../../modules/board/fetch';

export const getServerSideProps = async ({ req, query }) => {
  const [randomResturant] = await Promise.all([
    getRandomResturant({ category: query.category }),
  ]);

  return {
    props: {
      initialData: {
        [atomMapKey.board.randomResturantAtom]: randomResturant.data,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setRandomResturant = useSetRecoilState(setRandomResturantAtom);

  useEffect(() => {
    setRandomResturant(initialData.randomResturantAtom);
  }, []);

  return (
    <Wrapper>
      <Gnb isBack title="랜덤 맛집 뽑기" />
      {/* <PageComponent /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default Page;
