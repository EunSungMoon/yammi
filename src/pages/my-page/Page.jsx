// import ajvResolver from '@hookform/resolvers/ajv';
import { differenceInDays } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from '@components/Button';
import Form from '@components/Form';
import Input from '@components/Input';
import Typography from '@components/Typography';
import { NetworkError } from '@system/fetcher';

import { useToast } from '../../hooks/useToast';
import { accessTokenAtom } from '../../modules/auth/atom';
import { userAtom } from '../../modules/user/atom';
import { postUser } from '../../modules/user/fetch';

const Component = () => {
  const user = useRecoilValue(userAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  //TODO: resolver 확인!
  const { addToast } = useToast();

  const form = useForm({
    // resolver: ajvResolver({
    //   type: 'object',
    //   properties: {
    //     nickname: {
    //       type: 'string',
    //       minLength: 1,
    //       maxLength: 30,
    //       errorMessage: {
    //         type: '별병을 입력해주세요.',
    //         minLength: '별명은 최소 1글자 이상 입니다.',
    //         maxLength: '별명은 최대 30자 입니다.',
    //       },
    //     },
    //   },
    // }),
  });

  const isDisable = useMemo(() => {
    const today = new Date();
    const lastUpdateDateTime = user.last_update;
    const difference = differenceInDays(today, lastUpdateDateTime);
    if (difference >= 30) {
      return false;
    } else {
      return true;
    }
  }, [user]);

  const handleChangeNickname = async data => {
    try {
      await postUser(
        {
          nickname: data.nickname,
        },
        { accessToken },
      );
    } catch (err) {
      if (err instanceof NetworkError) {
        addToast({
          title: err.message,
          appearance: 'error',
        });
      } else {
        addToast({
          title: '닉네임을 변경하는데 오류가 발생했습니다.',
          appearance: 'warn',
        });
      }
    }
  };

  useEffect(() => {
    form.setValue('nickname', user.nickname);
  }, [user]);

  return (
    <Wrapper>
      <Box>
        <Row $isBorder>
          <Label>이메일</Label>
          <Value>{user.email}</Value>
        </Row>
        <Row>
          <Label>닉네임</Label>
          <FormWrapper>
            <Form form={form}>
              <Input
                name="nickname"
                placeholder="닉네임을 입력해주세요."
                width={'200px'}
              />
            </Form>
          </FormWrapper>
        </Row>
      </Box>
      <Info>
        <FiAlertCircle size={20} />
        <InfoLabel>닉네임은 30일에 한번만 변경가능합니다.</InfoLabel>
      </Info>
      <Button
        label="저장하기"
        appearance="primary"
        block
        disabled={isDisable}
        onClick={form.handleSubmit(handleChangeNickname)}
      />
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div`
  margin-bottom: 100px;
  padding: 24px 16px;
`;
const Box = styled.div`
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};
`;

const Row = styled.div`
  border-bottom: ${({ $isBorder, theme }) =>
    $isBorder ? `1px solid ${theme.colors.neutral[200]}` : 'none'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 12px;
  height: 64px;
`;

const Label = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'bold',
})``;

const Value = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

const FormWrapper = styled.div`
  width: 200px;
`;

const Info = styled.div`
  margin: 16px 0 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.blue[300]};
`;
const InfoLabel = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'regular',
  colorInheritance: true,
})``;
