import { useRouter } from 'next/router';
import { forwardRef, useState } from 'react';
import { Link } from 'react-scroll';
import styled, { css } from 'styled-components';

import Typography from '@components/Typography';

const Component = ({ items, id, isRouter, isCenter }, ref) => {
  const router = useRouter();
  const queryName = router.query[id];
  const [isFocused, setIsFocused] = useState(
    isRouter ? Number(queryName) || router.pathname : items[0].value,
  );

  return (
    <Wrapper>
      <Tabs $isCenter={isCenter} ref={ref}>
        {items.map(item => (
          <Link
            key={item.value}
            to={item.value}
            smooth={true}
            duration={500}
            offset={-100}
          >
            <TabItem
              onClick={() => {
                if (isRouter) {
                  router.push(item.link);
                }
                setIsFocused(item.value);
              }}
              $isFocused={item.value === isFocused || item.link === isFocused}
              $isCenter={isCenter}
            >
              <TabItemLabel>{item.label}</TabItemLabel>
            </TabItem>
          </Link>
        ))}
      </Tabs>
    </Wrapper>
  );
};

export default forwardRef(Component);

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral[0]};
`;
const Tabs = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral[100]}`};
  display: flex;
  align-items: center;
  justify-content: ${({ $isCenter }) =>
    $isCenter ? 'space-around' : 'initial'};
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
  padding: ${({ $isCenter }) => ($isCenter ? '12px 0' : '12px 16px')};
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
          background-color: ${theme.colors.primary[300]};
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
