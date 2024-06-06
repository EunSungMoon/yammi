import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';
import { Constant, CookieGetter } from '@system/cookie';

import PageComponent from './Page';
import { atomMapKey } from '../../../modules/atomMap';
import { setAccessTokenAtom } from '../../../modules/auth/atom';
import { setMyBookmarkedListAtom } from '../../../modules/user/atom';
import { getMyBookmarkedList } from '../../../modules/user/fetch';

export const getServerSideProps = async ({ req }) => {
  const cookieGetter = new CookieGetter({ req });
  const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);

  const [myBookmarkedList] = await Promise.all([
    getMyBookmarkedList({ accessToken }),
  ]);

  return {
    props: {
      initialData: {
        [atomMapKey.user.myBookmarkedListAtom]: myBookmarkedList.data,
        [atomMapKey.auth.accessTokenAtom]: accessToken,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setMyBookmarkedList = useSetRecoilState(setMyBookmarkedListAtom);
  const setAccessToken = useSetRecoilState(setAccessTokenAtom);

  useEffect(() => {
    setMyBookmarkedList(initialData[atomMapKey.user.myBookmarkedListAtom]);
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
