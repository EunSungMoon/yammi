import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from '@components/Button';
import useConfirm from '@components/hooks/useConfirm';
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

  const { open, close, ConfirmModalWrapper } = useConfirm('sm');

  useEffect(() => {
    setItem(initialData.itemAtom);
  }, []);

  return (
    <>
      <Wrapper>hello world</Wrapper>
      <button onClick={open}>modla</button>
      <ConfirmModalWrapper
        title={''}
        content={'선택하신 댓글을 삭제하시겠습니까?'}
        buttons={[{ label: '닫기', onClick: close }, { label: '닫기' }]}
      />
      <Button label="button" appearance="ghost" />
    </>
  );
}

const Wrapper = styled(Typography).attrs({
  variant: 'xxxl',
  fontWeight: 'bold',
})`
  color: ${({ theme }) => theme.colors.primary.red300};
`;
