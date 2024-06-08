import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Gnb from '@components/Gnb';
import { Constant, CookieGetter } from '@system/cookie';

import PageComponent from './Page';
import { atomMapKey } from '../modules/atomMap';
import { setAccessTokenAtom } from '../modules/auth/atom';
import { setCategoriesAtom } from '../modules/category/atom';
import { getCategories } from '../modules/category/fetch';
import { getUser } from '../modules/user/fetch';

export const getServerSideProps = async ({ req }) => {
  const cookieGetter = new CookieGetter({ req });
  const accessToken = cookieGetter.get(Constant.USER_ACCESS_TOKEN);
  const isLoggedIn = !!accessToken;

  try {
    let user = null;
    let token = null;
    const [categories] = await Promise.all([getCategories({})]);

    if (isLoggedIn) {
      user = await getUser({
        accessToken,
      });
      token = accessToken;
    }

    return {
      props: {
        initialData: {
          [atomMapKey.category.categoriesAtom]: categories,
          [atomMapKey.user.userAtom]: user,
          [atomMapKey.auth.accessTokenAtom]: token,
        },
      },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};

const Page = ({ initialData }) => {
  const setCategories = useSetRecoilState(setCategoriesAtom);
  const setAccessToken = useSetRecoilState(setAccessTokenAtom);

  useEffect(() => {
    setCategories(initialData[atomMapKey.category.categoriesAtom]);
    setAccessToken(initialData[atomMapKey.auth.accessTokenAtom]);
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
