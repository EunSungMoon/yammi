import styled from 'styled-components';

const Component = ({ children, ...props }) => (
  <StyledInputWrapper {...props}>{children}</StyledInputWrapper>
);

const StyledInputWrapper = styled.div`
  flex: 1;
  input::placeholder {
    color: ${({ theme }) => theme.colors.neutral[300]};
  }
  &::-ms-clear {
    display: none;
  }

  input::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.neutral[300]};
  }
  :-moz-placeholder {
    color: ${({ theme }) => theme.colors.neutral[300]};
    opacity: 1;
  }
  input::-moz-placeholder {
    color: ${({ theme }) => theme.colors.neutral[300]};
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.neutral[300]};
  }
  input::-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.neutral[300]};
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.neutral[300]};
  }
  /* input-styles */
  & > input {
    display: block;
    width: 100%;
    border: none;
    background-color: transparent;
    color: inherit;
    appearance: none;
    outline: none;
    padding: 0;
    margin: 0;
  }
`;

export default Component;
