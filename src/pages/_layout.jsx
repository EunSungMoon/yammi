import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Bnb from '@components/Bnb';
import Form from '@components/Form';
import Gnb from '@components/Gnb';

const Component = ({ children }) => {
  const form = useForm();
  return (
    <Wrapper>
      <ContentsWrapper>
        <Form form={form}>
          <Gnb isMenu isLogo />
        </Form>
        <Content>{children}</Content>
        <Bnb />
      </ContentsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const ContentsWrapper = styled.div`
  width: 375px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  margin: 0 auto;
`;
const Content = styled.main`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  min-height: 100vh;
  box-shadow:
    10px 0 10px -16px rgba(0, 0, 0, 0.5),
    -10px 0 10px -16px rgba(0, 0, 0, 0.5);
`;

export default Component;
