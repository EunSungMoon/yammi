import styled, { css } from 'styled-components';

import Typography from '../Typography';

const Component = ({ label, appearance, onClick, value }) => {
  return (
    <Wrapper $appearance={appearance} onClick={() => onClick(value)}>
      <Label $appearance={appearance}>{label}</Label>
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div`
  cursor: pointer;
  padding: 5px 16px;
  ${({ $appearance, theme }) => {
    if ($appearance === 'primary') {
      return css`
        border: 1px solid ${theme.colors.primary[300]};
        border-radius: 4px;
      `;
    } else {
      return css`
        border: none;
      `;
    }
  }}
`;
const Label = styled(Typography).attrs({
  type: 'text',
  fontWeight: 'regular',
  size: 's',
})`
  ${({ $appearance, theme }) => {
    if ($appearance === 'primary') {
      return css`
        color: ${theme.colors.primary[300]};
      `;
    } else {
      return css`
        color: ${theme.colors.neutral[700]};
      `;
    }
  }}
`;
