import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Button from '@components/Button';
import CheckboxGroup from '@components/CheckboxGroup';
import Form from '@components/Form';
import useConfirm from '@components/hooks/useConfirm';
import Input from '@components/Input';
import Select from '@components/Select';
import Textarea from '@components/Textarea';
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
  const form = useForm();

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
      <Form form={form}>
        <Select
          name="select"
          options={[
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
            { label: 'c', value: 'c' },
            { label: 'd', value: 'd' },
          ]}
        />
        <Input name="input" placeholder="입력해주세요" />
        <Textarea name="textarea" placeholder="입력해주세요" />
        <CheckboxGroup
          name="checkboxGroup"
          items={[
            { label: 'a', value: 'a', disabled: true },
            { label: 'b', value: 'b' },
          ]}
        />
      </Form>
    </>
  );
}

const Wrapper = styled(Typography).attrs({
  variant: 'xxxl',
  fontWeight: 'bold',
})`
  color: ${({ theme }) => theme.colors.primary.red300};
`;
