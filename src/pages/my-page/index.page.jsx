import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';
import { Constant, CookieGetter } from '@system/cookie';

import PageComponent from './Page';
import { atomMapKey } from '../../modules/atomMap';
import { setAccessTokenAtom } from '../../modules/auth/atom';
import { setUserAtom } from '../../modules/user/atom';
import { getUser } from '../../modules/user/fetch';

export const getServerSideProps = async ({ req }) => {
  const cookieGetter = new CookieGetter({ req });
  const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);

  const [user] = await Promise.all([getUser({ accessToken })]);
  return {
    props: {
      initialData: {
        [atomMapKey.user.userAtom]: user.data,
        [atomMapKey.auth.accessTokenAtom]: accessToken,
      },
    },
  };
};

const Page = ({ initialData }) => {
  const setUser = useSetRecoilState(setUserAtom);
  const setAccessToken = useSetRecoilState(setAccessTokenAtom);

  useEffect(() => {
    setUser(initialData[atomMapKey.user.userAtom]);
    setAccessToken(atomMapKey.auth.accessTokenAtom);
  }, []);

  return (
    <Wrapper>
      <Gnb title="마이페이지" isMenu />
      <PageComponent />
    </Wrapper>
  );
};

export default Page;

const Wrapper = styled.div``;
