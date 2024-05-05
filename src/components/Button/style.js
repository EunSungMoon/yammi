import { css } from 'styled-components';

export const BUTTON_COLORS = ['primary', 'subtle', 'ghost'];

const buttonStyles = {
  primary: css`
    color: ${({ theme }) => theme.colors.neutral[0]};
    background-color: ${({ theme }) => theme.colors.primary[300]};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary[400]};
    }
    &:active {
      background-color: ${({ theme }) => theme.colors.primary[500]};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.neutral[500]};
      background-color: ${({ theme }) => theme.colors.neutral[200]};
    }
  `,
  subtle: css`
    color: ${({ theme }) => theme.colors.neutral[700]};
    background-color: ${({ theme }) => theme.colors.neutral[0]};
    border: ${({ theme }) => `1px solid ${theme.colors.neutral[400]}`};

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral[50]};
      border: ${({ theme }) => `1px solid ${theme.colors.neutral[300]}`};
      color: ${({ theme }) => theme.colors.neutral[600]};
    }
    &:active {
      background-color: ${({ theme }) => theme.colors.neutral[0]};
      border: ${({ theme }) => `1px solid ${theme.colors.neutral[400]}`};
      color: ${({ theme }) => theme.colors.neutral[900]};
    }
    &:disabled {
      background-color: ${({ theme }) => theme.colors.neutral[200]};
      border: ${({ theme }) => `1px solid ${theme.colors.neutral[300]}`};
      color: ${({ theme }) => theme.colors.neutral[500]};
    }
  `,
  ghost: css`
    color: ${({ theme }) => theme.colors.neutral[700]};
    background-color: ${({ theme }) => theme.colors.neutral[0]};

    &:hover {
      color: ${({ theme }) => theme.colors.neutral[600]};
    }
    &:active {
      color: ${({ theme }) => theme.colors.neutral[900]};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.neutral[500]};
    }
  `,
};

export const getButtonStyle = variant => {
  return buttonStyles[variant];
};

const buttonHeightStyles = {
  sm: css`
    height: 33px;
  `,
  md: css`
    height: 40px;
  `,
  lg: css`
    height: 44px;
  `,
};
export const getButtonHeightStyle = variant => {
  return buttonHeightStyles[variant];
};
