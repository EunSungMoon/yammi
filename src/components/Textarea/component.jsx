import { forwardRef } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';

import Typography from '@components/Typography';

const Component = (
  { name, placeholder, defaultValue, height, ...props },
  ref,
) => {
  const { control, formState } = useFormContext();

  const dv = get(
    control._defaultValues,
    name,
    typeof defaultValue !== 'undefined' ? defaultValue : '',
  );

  const error = get(formState.errors, name);

  return (
    <Wrapper>
      <Controller
        name={name}
        control={control}
        defaultValue={dv}
        render={({ field: { onChange, value } }) => {
          return (
            <Textarea
              ref={ref}
              value={value}
              height={height}
              placeholder={placeholder}
              onChange={e => onChange(e.target.value)}
              hasError={!!error}
              {...props}
            />
          );
        }}
      />
      {error && <ErrorMsg>{error.message}</ErrorMsg>}
    </Wrapper>
  );
};

export default forwardRef(Component);
const Wrapper = styled.div``;

const Textarea = styled.textarea`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: ${({ height }) => (height ? height + 'px' : '104px')};
  padding: 12px;
  box-sizing: border-box;
  border: ${({ theme }) => `1px solid ${theme.colors.neutral[400]}`};
  border-radius: 6px;
  resize: none;
  color: ${({ theme }) => theme.colors.neutral[700]};
  font-family: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;

  ${({ disabled }) => {
    if (disabled) {
      return css`
        background: ${({ theme }) => theme.colors.neutral[50]};
      `;
    }
  }}

  ${({ hasError }) => {
    if (hasError) {
      return css`
        border-color: ${({ theme }) => theme.colors.red[400]};
      `;
    }
  }}
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[300]};
  }

  &:hover {
    &:not(:focus, :disabled) {
      background: ${({ theme }) => theme.colors.neutral[50]};
      border: ${({ theme }) => `1px solid ${theme.colors.neutral[300]}`};
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral[600]};
    }
  }

  &:focus {
    border: ${({ theme }) => `1px solid ${theme.colors.blue[400]}`};
    outline: none;
    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral[300]};
    }
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutral[200]};
    color: ${({ theme }) => theme.colors.neutral[500]};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.neutral[500]};
    border: ${({ theme }) => `1px solid ${theme.colors.neutral[300]}`};
    opacity: 1;
  }
`;

const ErrorMsg = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'regular',
  component: 'div',
})`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.red[300]};
  white-space: nowrap;
`;
