import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';
import { Constant, CookieGetter } from '@system/cookie';

import PageComponent from './Page';
import { atomMapKey } from '../../../modules/atomMap';
import { setAccessTokenAtom } from '../../../modules/auth/atom';
import { setMyReviewedListAtom } from '../../../modules/user/atom';
import { getMyReviewList, getUser } from '../../../modules/user/fetch';

export const getServerSideProps = async ({ req }) => {
  const cookieGetter = new CookieGetter({ req });
  const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);

  const [myReviewList, user] = await Promise.all([
    getMyReviewList({}, { accessToken }),
    getUser({ accessToken }),
  ]);

  return {
    props: {
      initialData: {
        [atomMapKey.user.myReviewedListAtom]: myReviewList.data,
        [atomMapKey.user.userAtom]: user.data,
        [atomMapKey.auth.accessTokenAtom]: accessToken,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setMyReviewList = useSetRecoilState(setMyReviewedListAtom);
  const setAccessToken = useSetRecoilState(setAccessTokenAtom);

  useEffect(() => {
    setMyReviewList(initialData[atomMapKey.user.myReviewedListAtom]);
    setAccessToken(initialData[atomMapKey.auth.accessTokenAtom]);
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
