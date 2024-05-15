import { useRouter } from 'next/router';
import { useState } from 'react';
import { Element, Link } from 'react-scroll';
import styled, { css } from 'styled-components';

import Typography from '@components/Typography';

const Component = ({ items, id, isRouter }) => {
  const router = useRouter();
  const queryName = router.query[id];
  const [isFocused, setIsFocused] = useState(
    Number(queryName) || router.pathname,
  );

  return (
    <Wrapper>
      <Tabs>
        {items.map(item => (
          <Link key={item.value} to={item.value} smooth={true} duration={500}>
            <TabItem
              onClick={() => {
                if (isRouter) {
                  router.push(item.link);
                }
                setIsFocused(item.value);
              }}
              $isFocused={item.value === isFocused || item.link === isFocused}
            >
              <TabItemLabel>{item.label}</TabItemLabel>
            </TabItem>
          </Link>
        ))}
      </Tabs>
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div``;
const Tabs = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral[100]}`};
  display: flex;
  align-items: center;
  padding: 0 16px;

  flex-flow: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  white-space: nowrap;

  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const TabItem = styled.div`
  cursor: pointer;
  padding: 12px 16px;
  position: relative;
  ${({ theme, $isFocused }) => {
    if ($isFocused) {
      return css`
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          z-index: 2;
          background-color: ${({ theme }) => theme.colors.primary[300]};
        }
      `;
    }
  }}
`;
const TabItemLabel = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'bold',
})`
  color: ${({ theme }) => theme.colors.neutral[900]};
`;
