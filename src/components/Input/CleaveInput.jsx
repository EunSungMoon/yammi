import { forwardRef, useState } from 'react';
import { FiEye } from 'react-icons/fi';

import Container from './common/Container';
import InputWrapper from './common/InputWrapper';
import Prefix from './common/Prefix';
import Suffix from './common/Suffix';

const Cleave = require('cleave.js/react');

// eslint-disable-next-line react/display-name
const Component = forwardRef(
  (
    {
      options = {},
      type,
      size = 'sm',
      hasError,
      suffix,
      prefix,
      maxWidth,
      containerStyle,
      toggleable,
      isNumber = false,
      ...inputProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Container
        isFocused={isFocused}
        isDisabled={!!inputProps.disabled}
        isReadOnly={!!inputProps.readOnly}
        hasError={!!hasError}
        maxWidth={maxWidth}
        size={size}
        style={containerStyle}
      >
        {prefix && <Prefix>{prefix}</Prefix>}
        <InputWrapper>
          <Cleave
            {...inputProps}
            options={options}
            type={type}
            ref={ref}
            onFocus={e => {
              setIsFocused(true);
              inputProps.onFocus?.(e);
            }}
            onBlur={e => {
              setIsFocused(false);
              inputProps.onBlur?.(e);
            }}
            autoComplete="off"
            style={isNumber ? { 'text-align': 'right' } : undefined}
          />
        </InputWrapper>
        {suffix && (
          <Suffix>
            {toggleable && <FiEye size={16} />}
            {suffix}
          </Suffix>
        )}
      </Container>
    );
  },
);

export default Component;
