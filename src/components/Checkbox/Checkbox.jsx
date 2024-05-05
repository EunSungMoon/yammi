import { forwardRef, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';

import Check from './Check';
import Typography from '../Typography';

/**
 *
 * @param {object} props
 * @param {'default' | 'minus'} props.checkStyle
 * @returns
 */

const Component = (
  {
    id,
    name,
    label,
    checkValue,
    indeterminateValue,
    disabled = false,
    checkStyle = 'default',
    ...props
  },
  ref,
) => {
  const uniqueId = useMemo(() => id + name, [id, name]);
  const renderLabel = (value, label) => {
    if (!label) {
      return;
    } else if (typeof label === 'string') {
      return (
        <LabelBox htmlFor={uniqueId} $isDisabled={disabled}>
          <Label
            variant="h200"
            fontWeight="medium"
            $isChecked={value}
            $isDisabled={disabled}
          >
            {label}
          </Label>
        </LabelBox>
      );
    } else {
      return label;
    }
  };

  return (
    <InnerWrapper>
      <Check
        ref={ref}
        id={uniqueId}
        name={name}
        checked={checkValue}
        indeterminate={indeterminateValue}
        disabled={disabled}
        checkStyle={checkStyle}
        {...props}
      />
      {renderLabel(checkValue, label)}
    </InnerWrapper>
  );
};

export default forwardRef(Component);

const InnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
`;

const Label = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.neutral[700]};
  white-space: pre-line;

  ${({ $isChecked, $isDisabled }) =>
    $isChecked &&
    !$isDisabled &&
    css`
      animation-duration: 100ms;
      animation-timing-function: ease-out;
      animation-name: ${fadeIn};
    `};

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      color: ${({ theme }) => theme.colors.neutral[500]};
    `};
`;

const LabelBox = styled.label`
  white-space: nowrap;
  margin-left: 8px;
  ${({ $isDisabled }) =>
    !$isDisabled &&
    css`
      cursor: pointer;
    `};
`;
