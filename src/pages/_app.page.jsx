import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { ToastProvider } from '@components/Toast';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/themes';
import { Constant, CookieGetter } from '@system/cookie';

import useLayoutDispenser from '../hooks/useLayoutDispenser';
import { atomHydrator, atomMapKey } from '../modules/atomMap';

export default function App({ Component, pageProps, initialData }) {
  const { session, initialData: pageInitialData } = pageProps;
  const hydrates = atomHydrator({ ...initialData, ...pageInitialData });

  const { LayoutComponent } = useLayoutDispenser();

  return (
    <>
      <Head>
        <title>Ya:ㅁ!</title>
      </Head>
      <RecoilRoot
        initializeState={({ set }) => {
          // 초기 Recoil 상태 설정
          Object.keys(initialData).forEach(key => {
            set(key, initialData[key]);
          });
        }}
      >
        <StyledThemeProvider theme={theme}>
          <GlobalStyle />
          <Toaster />
          <ToastProvider>
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </ToastProvider>
        </StyledThemeProvider>
      </RecoilRoot>
    </>
  );
}

App.getInitialProps = async appContext => {
  let vmInitialData = {};
  const cookie = new CookieGetter(appContext.ctx);

  const accessToken = cookie.get(Constant.USER_ACCESS_TOKEN);
  const idToken = cookie.get(Constant.USER_STRINGIFIED_PROFILE);

  if (accessToken && idToken) {
    const decodedIdToken = JSON.parse(idToken);
    vmInitialData = {
      // [atomMapKey.auth.accessTokenAtom]: accessToken,
      // [atomMapKey.auth.decodedIdTokenAtom]: decodedIdToken,
    };
  } else {
    vmInitialData = {
      // [atomMapKey.auth.accessTokenAtom]: null,
      // [atomMapKey.auth.decodedIdTokenAtom]: null,
    };
  }

  let appProps;
  try {
    appProps = await App.getInitialProps(appContext);
  } catch (err) {
    // appProps.error = err;
  }

  return {
    ...appProps,
    // pageProps: appProps.pageProps,
    initialData: vmInitialData,
  };
};
