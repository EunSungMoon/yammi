import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';
import { Constant, CookieGetter } from '@system/cookie';

import PageComponent from './Page';
import { atomMapKey } from '../../modules/atomMap';
import { setAccessTokenAtom } from '../../modules/auth/atom';
import { setRandomRestaurantAtom } from '../../modules/board/atom';
import { getRandomRestaurant } from '../../modules/board/fetch';

export const getServerSideProps = async ({ req, query }) => {
  const cookieGetter = new CookieGetter({ req });
  const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);

  const [randomRestaurant] = await Promise.all([
    getRandomRestaurant({ category: query.category }, { accessToken }),
  ]);

  return {
    props: {
      initialData: {
        [atomMapKey.board.randomRestaurantAtom]: randomRestaurant.data,
        [atomMapKey.auth.accessTokenAtom]: accessToken,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setRandomRestaurant = useSetRecoilState(setRandomRestaurantAtom);
  const setAccessToken = useSetRecoilState(setAccessTokenAtom);

  useEffect(() => {
    setRandomRestaurant(initialData[atomMapKey.board.randomRestaurantAtom]);
    setAccessToken(initialData[atomMapKey.auth.accessTokenAtom]);
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
