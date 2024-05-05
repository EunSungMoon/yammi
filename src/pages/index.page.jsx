import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from '@components/Button';
import useModal from '@components/hooks/useModal';
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

  const { open, close, ModalWrapper } = useModal('sm');

  useEffect(() => {
    setItem(initialData.itemAtom);
  }, []);

  return (
    <>
      <Wrapper>hello world</Wrapper>
      <button onClick={open}>modla</button>
      <ModalWrapper title={'test'} content={'tes'} />
      <Button label="button" appearance="ghost" isLink />
    </>
  );
}

const Wrapper = styled(Typography).attrs({
  variant: 'xxxl',
  fontWeight: 'bold',
})`
  color: ${({ theme }) => theme.colors.primary.red300};
`;
