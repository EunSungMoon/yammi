import getConfig from 'next/config';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import Button from '@components/Button';
import Form from '@components/Form';
import Input from '@components/Input';
import NaverLogin from '@components/NaverLogin';
import Toast from '@components/Toast/Toast';
import { Constant, CookieSetter } from '@system/cookie';

import { setAccessTokenAtom } from '../modules/auth/atom';
import { login } from '../modules/auth/fetch';

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      initialData: {},
    },
  };
};

export default function Home({ initialData }) {
  const form = useForm();
  const { naverLoginClientId } = getConfig().publicRuntimeConfig;
  const setAccessToken = useSetRecoilState(setAccessTokenAtom);

  const handleNaverLogin = async data => {
    // const { id, email, nickname, mobile, gender, name } = data;
    // const newPn = mobile.replaceAll('-', '');
    try {
      // console.log('🚀 ~ handleNaverLogin ~ data:', data);
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

  const handleClick = async body => {
    const response = await login(body);
    setAccessToken(response.data.accessToken);
    const setter = new CookieSetter();
    setter.set(Constant.USER_ACCESS_TOKEN, response.data.accessToken, {
      expries: '',
    });
  };

  return (
    <>
      <Toast parameters={{ title: 'test', appearance: 'success' }} />
      <Form form={form}>
        <Input name="username" />
        <Button
          label="login"
          onClick={form.handleSubmit(handleClick)}
          appearance="primary"
          type="button"
        />
      </Form>
      <NaverLogin
        clientId={naverLoginClientId}
        callbackUrl={'http://localhost:3000/playground'}
        render={({ onClick }) => <div onClick={onClick}>네이버로 로그인</div>}
        onSuccess={res => handleNaverLogin(res)}
        onFailure={res => console.error('failure >>> ', res)}
      />
    </>
  );
}
