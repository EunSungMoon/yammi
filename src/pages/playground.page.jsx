import getConfig from 'next/config';

import NaverLogin from '@components/NaverLogin';

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      initialData: {},
    },
  };
};

export default function Home({ initialData }) {
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
    <>
      <NaverLogin
        clientId={naverLoginClientId}
        callbackUrl={'http://localhost:3000'}
        render={({ onClick }) => <div onClick={onClick}>네이버로 로그인</div>}
        onSuccess={res => handleNaverLogin(res)}
        onFailure={res => console.error('failure >>> ', res)}
      />
    </>
  );
}
