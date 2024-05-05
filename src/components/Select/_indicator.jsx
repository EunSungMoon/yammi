import { FiChevronDown } from 'react-icons/fi';
import styled, { css, useTheme } from 'styled-components';

const Indicator = ({ colored = false, rotated = false }) => {
  const theme = useTheme();
  return (
    <Icon rotated={rotated}>
      <FiChevronDown
        size={20}
        color={colored ? theme.colors.neutral[500] : theme.colors.neutral[700]}
      />
    </Icon>
  );
};

export default Indicator;

const Icon = styled.div`
  display: flex;
  align-items: center;
  ${({ rotated }) =>
    rotated &&
    css`
      transform: rotate(180deg);
    `};
`;
