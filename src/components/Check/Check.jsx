import { forwardRef, useMemo } from 'react';
import styled, { css } from 'styled-components';

const Component = ({ id, name, checked, disabled, ...rest }, ref) => {
  const uniqueId = useMemo(() => id || name, [id, name]);

  return (
    <Wrapper>
      <HtmlCheckbox
        type="checkbox"
        id={uniqueId}
        name={name}
        {...rest}
        checked={checked}
        disabled={disabled}
        ref={ref}
      />
      <StyledCheckbox
        htmlFor={uniqueId}
        isChecked={checked}
        isDisabled={disabled}
      >
        <CheckMark />
      </StyledCheckbox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 18px;
  height: 18px;
`;

const HtmlCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
`;

const CheckMark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  width: 6px;
  height: 11px;
  border-top: 2px solid transparent !important;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  border-left: 2px solid transparent !important;
  transform: translate(-50%, -60%) rotate(45deg);
`;

const StyledCheckbox = styled.label`
  display: inline-block;
  position: relative;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.neutral[300]};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  width: 18px;
  height: 18px;

  ${({ theme, isDisabled }) =>
    isDisabled &&
    css`
      border-color: ${theme.colors.neutral[200]};
      background-color: ${theme.colors.neutral[200]};
    `};

  ${({ isChecked }) =>
    isChecked &&
    css`
      border-color: ${({ theme }) => theme.colors.primary[300]};
      background-color: ${({ theme }) => theme.colors.primary[300]};

      & > ${CheckMark} {
        opacity: 1;
      }
    `};

  ${({ theme, isChecked, isDisabled }) =>
    isChecked &&
    isDisabled &&
    css`
      border-color: ${theme.colors.neutral[200]};
      background-color: ${theme.colors.neutral[200]};
    `};
`;

export default forwardRef(Component);
