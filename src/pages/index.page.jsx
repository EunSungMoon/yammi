import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Typography from '@components/Typography';
import { NetworkError } from '@system/fetcher';

import { atomMapKey } from '../modules/atomMap';
import { itemAtom, setItemAtom } from '../modules/test/atom';
import { getItems } from '../modules/test/fetch';

export const getServerSideProps = async ({ req }) => {
  const [item] = await Promise.all([getItems({})]);

  return {
    props: {
      initialData: {
        [atomMapKey.test.itemAtom]: item,
      },
    },
  };
};

export default function Home({ initialData }) {
  const item = useRecoilValue(itemAtom);
  const setItem = useSetRecoilState(setItemAtom);

  useEffect(() => {
    setItem(initialData.itemAtom);
  }, []);

  return (
    <>
      <Wrapper>hello world</Wrapper>
    </>
  );
}

const Wrapper = styled(Typography).attrs({
  variant: 'xxxl',
  fontWeight: 'bold',
})`
  color: ${({ theme }) => theme.colors.primary.red300};
`;
