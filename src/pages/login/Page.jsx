import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Image from '@components/Image';
import NaverLogin from '@components/NaverLogin';
import Typography from '@components/Typography';
import { Constant, CookieSetter } from '@system/cookie';
import { NetworkError } from '@system/fetcher';

import { useToast } from '../../hooks/useToast';
import { setAccessTokenAtom } from '../../modules/auth/atom';
import { login } from '../../modules/auth/fetch';

const Component = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { naverLoginClientId } = getConfig().publicRuntimeConfig;
  const setAccessToken = useSetRecoilState(setAccessTokenAtom);

  const handleNaverLogin = async data => {
    const { id, email } = data;
    try {
      const { token } = await login({
        code: id,
        email: email,
      });

      const setter = new CookieSetter();
      setter.set(Constant.USER_ACCESS_TOKEN, token, { expries: '' });
      setAccessToken(token);

      addToast({
        appearance: 'success',
        title: '로그인 성공했습니다.',
      });

      router.push('/');
    } catch (err) {
      if (err instanceof NetworkError) {
        console.log('err>>>>>>>', err);
        addToast({
          appearance: 'error',
          title: err.message,
        });
      } else {
        addToast({
          appearance: 'error',
          title: '로그인에 실패했습니다.',
        });
      }
    }
  };
  return (
    <Wrapper>
      <TopSection>
        <Text>즐거운 점심의 시작</Text>
        <Image src={'/images/logo.svg'} width={180} height={60} alt={'logo'} />
      </TopSection>
      <NaverLogin
        clientId={naverLoginClientId}
        callbackUrl={'http://localhost:3000/login'}
        render={({ onClick }) => (
          <NaverButton onClick={onClick}>
            <Image
              src={'/images/naverlogo.svg'}
              width={16}
              height={16}
              alt={''}
            />
            <ButtonLabel>네이버로 로그인</ButtonLabel>
          </NaverButton>
        )}
        onSuccess={res => handleNaverLogin(res)}
        onFailure={res => console.error('failure >>> ', res)}
      />
    </Wrapper>
  );
};
export default Component;

const Wrapper = styled.div`
  padding: 0 16px;
`;

const TopSection = styled.div`
  margin-bottom: 200px;
  padding-top: 130px;
`;

const Text = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'medium',
})`
  color: ${({ theme }) => theme.colors.neutral[700]};
  margin-bottom: 12px;
`;

const NaverButton = styled.div`
  background-color: #03c75a;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 14px;
  cursor: pointer;
`;

const ButtonLabel = styled(Typography).attrs({
  variant: 'l',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[0]};
`;
