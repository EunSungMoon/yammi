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
  padding: 13px 12px;
  border-radius: 6px;
  border: ${({ theme }) => `1px solid ${theme.colors.neutral[400]}`};
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  color: ${({ theme }) => theme.colors.neutral[700]};
  max-width: ${({ maxWidth }) =>
    typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`};
  input {
    display: block;
    width: 100%;
    border: none;
    background-color: transparent;
    color: inherit;
    appearance: none;
    outline: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.5;
    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral[300]};
    }
  }

  &:hover {
    ${({ isFocused, isDisabled, theme }) =>
      !isFocused &&
      !isDisabled &&
      css`
        border: ${({ theme }) => `1px solid ${theme.colors.neutral[400]}`};
        background-color: ${theme.colors.neutral[50]};
        input::placeholder {
          color: ${({ theme }) => theme.colors.neutral[600]};
        }
      `};
  }

  ${({ theme, isFocused, hasError, isDisabled, isReadOnly }) => {
    if (isDisabled) {
      return css`
        background-color: ${theme.colors.neutral[200]};
        border-color: ${theme.colors.neutral[300]};
        color: ${theme.colors.neutral[500]};
        input::placeholder {
          color: ${({ theme }) => theme.colors.neutral[500]};
        }
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
