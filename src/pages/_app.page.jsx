import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { ToastProvider } from '@components/Toast';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/themes';
import { Constant, CookieGetter } from '@system/cookie';

import useLayoutDispenser from '../hooks/useLayoutDispenser';
import { atomHydrator, atomMapKey } from '../modules/atomMap';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { LayoutComponent } = useLayoutDispenser();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        atomHydrator({ initialData: pageProps.initialData, recoilSetter: set });
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Head>
          <title>Ya:ㅁ!</title>
        </Head>
        <Toaster />
        <ToastProvider>
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </ToastProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

App.getInitialProps = async appContext => {
  let vmInitialData = {};
  const cookie = new CookieGetter(appContext.ctx);

  const accessToken = cookie.get(Constant.USER_ACCESS_TOKEN);

  if (accessToken) {
    vmInitialData = {
      [atomMapKey.auth.accessTokenAtom]: accessToken,
    };
  } else {
    vmInitialData = {
      [atomMapKey.auth.accessTokenAtom]: null,
    };
  }

  // let appProps;
  // try {
  //   appProps = await App.getInitialProps(appContext);
  // } catch (err) {
  //   // appProps.error = err;
  // }

  return {
    initialData: vmInitialData,
  };
};
