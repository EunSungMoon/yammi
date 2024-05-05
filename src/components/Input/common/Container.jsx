import styled, { css } from 'styled-components';

const Component = ({ children, ...props }) => (
  <StyledContainer {...props}>{children}</StyledContainer>
);

const StyledContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 12px;
  border-radius: 6px;
  border: ${({ theme }) => `1px solid ${theme.colors.neutral[400]}`};
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  color: ${({ theme }) => theme.colors.neutral[700]};
  max-width: ${({ maxWidth }) =>
    typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`};

  &:hover {
    ${({ isFocused, isDisabled, theme }) =>
      !isFocused &&
      !isDisabled &&
      css`
        border: ${({ theme }) => `1px solid ${theme.colors.neutral[400]}`};
        background-color: ${theme.colors.neutral[50]};
      `};
  }

  ${({ theme, isFocused, hasError, isDisabled, isReadOnly }) => {
    if (isDisabled) {
      return css`
        background-color: ${theme.colors.neutral[200]};
        border-color: ${theme.colors.neutral[300]};
        color: ${theme.colors.neutral[500]};
      `;
    }

    if (hasError) {
      return css`
        border-color: ${theme.colors.red[400]};
      `;
    }

    if (isFocused) {
      return css`
        border: ${({ theme }) => `1px solid ${theme.colors.blue[400]}`};
      `;
    }
  }}
`;

export default Component;
