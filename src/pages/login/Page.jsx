import getConfig from 'next/config';
import styled from 'styled-components';

import Image from '@components/Image';
import NaverLogin from '@components/NaverLogin';
import Typography from '@components/Typography';

const Component = () => {
  const { naverLoginClientId } = getConfig().publicRuntimeConfig;

  const handleNaverLogin = async data => {
    // const { id, email, nickname, mobile, gender, name } = data;
    // const newPn = mobile.replaceAll('-', '');
    try {
      console.log('🚀 ~ handleNaverLogin ~ data:', data);
      // await snsLogin({
      //   snsId: id,
      //   snsProvider: SnsProviderType.NAVER,
      //   username: email,
      //   displayName: nickname,
      //   deviceType: deviceType,
      //   name: name,
      //   phoneNumber: mobile ? newPn : null,
      //   gender: gender === 'M' ? '남성' : gender === 'F' ? '여성' : null,
      // });
      // addToast({
      //   appearance: 'success',
      //   title: '로그인 성공했습니다.',
      // });
      // localStorage.setItem('snsProvider', SnsProviderType.NAVER);
      // localStorage.removeItem('recentLoginAccount');
      // window.location.href = '/';
    } catch (err) {
      console.log('err>>>>>>>', err);
      // if (err instanceof NetworkError) {
      //   if (err.code === 'E4010006') {
      //     setSnsErrorMessage(err.message);
      //     snsLoginErrorOpen();
      //   } else {
      //     addToast({
      //       appearance: 'error',
      //       title: err.message,
      //     });
      //   }
      // } else {
      //   addToast({
      //     appearance: 'error',
      //     title: '로그인에 실패했습니다.',
      //   });
      // }
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
        callbackUrl={'http://localhost:3000'}
        render={({ onClick }) => (
          <NaverButton onClick={onClick}>
            <Image src={'/images/naverlogo.svg'} width={16} height={16} />
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
