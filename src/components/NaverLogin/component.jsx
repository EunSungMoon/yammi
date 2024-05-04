import { useEffect } from 'react';
import styled from 'styled-components';

const JS_SDK_NAME = 'naver-login-jssdk';

const Component = ({ render, clientId, callbackUrl, onSuccess, onFailure }) => {
  const loadNaverIdLoginSdk = () => {
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;

      js = d.createElement(s);
      js.id = id;
      // tslint:disable-next-line:max-line-length
      js.src = `https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js`;
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, 'script', JS_SDK_NAME, () => {
      const naver = window.naver;
      if (!window.opener) {
        naver.successCallback = data => onSuccess(data);
      }
      const naverLogin = new naver.LoginWithNaverId({
        clientId,
        callbackUrl,
        isPopup: true, // 팝업 형태로 인증 여부
        loginButton: {
          color: 'green', // 색상
          type: 3, // 버튼 크기
          height: '60', // 버튼 높이
        }, // 로그인 버튼 설정
      });

      naverLogin.init();
      naverLogin.getLoginStatus(status => {
        if (status && window.opener) {
          // 로그인 된 이후
          window.opener.naver.successCallback({
            ...naverLogin.user,
          });
          window.close();
        }
      });
    });
  };

  useEffect(() => {
    if (!document.getElementById(JS_SDK_NAME)) {
      loadNaverIdLoginSdk();
    }
  }, []);

  return (
    <Wrapper>
      {render({
        onClick: () => {
          if (!document || !document.querySelector('#naverIdLogin').firstChild)
            return;
          const naverLoginButton =
            document.querySelector('#naverIdLogin').firstChild;
          naverLoginButton.click();
        },
      })}
      <div
        style={{ position: 'absolute', top: '-1000000px' }}
        id="naverIdLogin"
      ></div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Component;
