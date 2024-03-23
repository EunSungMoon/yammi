import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { NetworkError } from '@system/fetcher';

import { getItemAtom, itemAtom, setItemAtom } from '../modules/test/atom';
import { getItems } from '../modules/test/fetch';

export const getServerSideProps = async ({ req }) => {
  // const [item] = await Promise.all([getItems({})]);

  return {
    props: {
      initialData: {
        // item: item,
      },
    },
  };
};

export default function Home({ initialData }) {
  const [item, setItem] = useRecoilState(itemAtom);

  // const getItem = useRecoilValue(getItemAtom({ query: 'test' }));

  // const setItem = useSetRecoilState(setItemAtom);

  useEffect(() => {
    // console.log('getItem>>>', getItem);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getItems({
          query: { params: 'test' },
        });
        setItem(response);

        return res;
      } catch (err) {
        if (err instanceof NetworkError) {
          console.log(err);
        }
      }
    };
    load();
    // setItem(res)
  }, []);

  return (
    <>
      <div>hello world</div>
    </>
  );
}
