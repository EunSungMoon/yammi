import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';
import { Constant, CookieGetter } from '@system/cookie';

import PageComponent from './Page';
import { atomMapKey } from '../../../modules/atomMap';
import { setMyReviewedListAtom } from '../../../modules/board/atom';
import { getMyReviewList } from '../../../modules/board/fetch';

export const getServerSideProps = async ({ req }) => {
  const cookieGetter = new CookieGetter({ req });
  const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);

  const [myReviewList] = await Promise.all([getMyReviewList({ accessToken })]);

  return {
    props: {
      initialData: {
        [atomMapKey.board.myReviewedListAtom]: myReviewList.data,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setMyReviewList = useSetRecoilState(setMyReviewedListAtom);

  useEffect(() => {
    setMyReviewList(initialData.myReviewedListAtom);
  }, []);

  return (
    <Wrapper>
      <Gnb title="즐겨찾기" isMenu />
      <PageComponent />
    </Wrapper>
  );
};
export default Page;
const Wrapper = styled.div``;
