import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Bnb from '@components/Bnb';

const Component = ({ children }) => {
  const router = useRouter();

  return (
    <Wrapper>
      <ContentsWrapper>
        <Content>{children}</Content>
        {router.pathname !== '/login' ? <Bnb /> : null}
      </ContentsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const ContentsWrapper = styled.div`
  width: 375px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  margin: 0 auto;

  ${({ theme }) => theme.responsive('sm')} {
    width: 100%;
  }
`;
const Content = styled.main`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  min-height: 100vh;
  box-shadow:
    10px 0 10px -16px rgba(0, 0, 0, 0.5),
    -10px 0 10px -16px rgba(0, 0, 0, 0.5);

  ${({ theme }) => theme.responsive('sm')} {
    box-shadow: none;
  }
`;

export default Component;
