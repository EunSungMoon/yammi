import Head from 'next/head';
import { RecoilRoot } from 'recoil';

import { atomHydrator, atomMapKey } from '../modules/atomMap';

export default function App({ Component, pageProps, initialData = {} }) {
  const { session, initialData: pageInitialData } = pageProps;
  const hydrates = atomHydrator({ ...initialData, ...pageInitialData });
  // console.log('🚀 ~ App ~ hydrates:', hydrates);
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
