import { useRouter } from 'next/router';
import { useMemo } from 'react';
import styled from 'styled-components';

import Image from '@components/Image';

const Component = () => {
  const router = useRouter();

  const BnbItems = useMemo(
    () => [
      {
        link: '/category',
        icon: 'map-pin',
      },
      {
        link: '/search',
        icon: 'search',
      },
      {
        link: '/',
        icon: 'home',
      },
      {
        link: '/',
        icon: 'star',
      },
      {
        link: '/',
        icon: 'user',
      },
    ],
    [],
  );

  return (
    <Wrapper>
      <Container>
        {BnbItems.map(item => (
          <IconWrapper key={item.icon}>
            <Image
              src={`/images/${item.icon}${router.pathname === item.link ? '_clicked' : ''}.svg`}
              alt={item.icon}
              width={28}
              height={28}
            />
          </IconWrapper>
        ))}
      </Container>
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;

  z-index: 100;
  width: 375px;
  margin: 0 auto;
  left: 50%;
  transform: translate(-50%);
  ${({ theme }) => theme.responsive('sm')} {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  height: 82px;
  padding: 12px 16px 42px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.neutral[400]}`};
`;
const IconWrapper = styled.div`
  cursor: pointer;
`;
