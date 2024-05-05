import { forwardRef, useState } from 'react';

import Container from './common/Container';
import InputWrapper from './common/InputWrapper';
import Suffix from './common/Suffix';

const Component = forwardRef(
  (
    {
      type,
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
        noStyle={noStyle}
      >
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
