import { forwardRef, useState } from 'react';

import Container from './common/Container';
import InputWrapper from './common/InputWrapper';
import Suffix from './common/Suffix';

const Component = forwardRef(
  (
    {
      type,
      size = 'sm',
      hasError,
      suffix,
      suffixOnClick,
      suffixOnRender,
      maxWidth,
      noStyle = false,
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
        noStyle={noStyle}
      >
        {/* <InputWrapper inputSize={size}> */}
        <input
          {...inputProps}
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
        />
        {/* </InputWrapper> */}
        {(suffix || suffixOnRender) && (
          <Suffix
            title={suffix}
            onClick={suffixOnClick}
            onRenderChildren={suffixOnRender}
          />
        )}
      </Container>
    );
  },
);

Component.displayName = 'InputOrigin';

export default Component;
