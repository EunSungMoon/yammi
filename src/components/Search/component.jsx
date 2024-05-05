import { useState } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

import Container from '../Input/common/Container';

const Component = ({ name, hasError, maxWidth, type, ...inputProps }) => {
  const [isFocused, setIsFocused] = useState(false);

  const { control, register, formState } = useFormContext();

  const dv = get(
    control._defaultValues,
    name,
    typeof defaultValue !== 'undefined' ? defaultValue : '',
  );

  return (
    <Wrapper>
      <Controller
        name={name}
        control={control}
        defaultValue={dv}
        render={({ field: { onChange, value } }) => {
          return (
            <Container
              isFocused={isFocused}
              isDisabled={!!inputProps.disabled}
              isReadOnly={!!inputProps.readOnly}
              hasError={!!hasError}
              maxWidth={maxWidth}
              isPrimary
            >
              <IconWrapper>
                <FiSearch size={20} />
              </IconWrapper>
              <input
                {...inputProps}
                type={type}
                onFocus={e => {
                  setIsFocused(true);
                  inputProps.onFocus?.(e);
                }}
                onBlur={e => {
                  setIsFocused(false);
                  inputProps.onBlur?.(e);
                }}
                autoComplete="off"
                onChange={e => {
                  onChange(e.target.value);
                }}
              />
            </Container>
          );
        }}
      />
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div``;

const IconWrapper = styled.div`
  margin-right: 13px;
  color: ${({ theme }) => theme.colors.primary[300]};
`;
