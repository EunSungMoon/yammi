import Head from 'next/head';
import { RecoilRoot } from 'recoil';
export default function App({ Component, pageProps, initialData = {} }) {
  return (
    <>
      <Head>
        <title>yammi</title>
      </Head>
      <RecoilRoot
        initializeState={({ set }) => {
          // 초기 Recoil 상태 설정
          Object.keys(initialData).forEach(key => {
            set(key, initialData[key]);
          });
        }}
      >
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
