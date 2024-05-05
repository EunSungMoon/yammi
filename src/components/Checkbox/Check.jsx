import { forwardRef, useMemo } from 'react';
import { FiCheck, FiMinus } from 'react-icons/fi';
import styled, { useTheme } from 'styled-components';

const Component = (
  { id, name, checkStyle, checked, disabled, ...props },
  ref,
) => {
  const uniqueId = useMemo(() => id || name, [id, name]);
  const theme = useTheme();

  const renderCheckedMark = () => {
    if (checked) {
      if (checkStyle === 'default') {
        return (
          <FiCheck
            size={14}
            color={
              disabled ? theme.colors.neutral[300] : theme.colors.neutral[0]
            }
          />
        );
      } else if (checkStyle === 'minus') {
        return (
          <FiMinus
            size={14}
            color={
              disabled ? theme.colors.neutral[300] : theme.colors.neutral[0]
            }
          />
        );
      }
    }
  };

  return (
    <Wrapper>
      <HtmlCheckbox
        ref={ref}
        id={uniqueId}
        type="checkbox"
        name={name}
        disabled={disabled}
        checked={checked}
        $checkStyle={checkStyle}
        {...props}
      />
      <StyledCheckbox htmlFor={uniqueId}>
        <CheckMark>{renderCheckedMark()}</CheckMark>
      </StyledCheckbox>
    </Wrapper>
  );
};

export default forwardRef(Component);

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HtmlCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
`;
const CheckMark = styled.div`
  transition: all 120ms linear;
`;
const StyledCheckbox = styled.label`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  cursor: pointer;
  width: 16px;
  height: 16px;

  ${HtmlCheckbox}:checked ~ & {
    background-color: ${({ theme }) => theme.colors.primary[400]};
    border-color: ${({ theme }) => theme.colors.primary[400]};
  }

  ${HtmlCheckbox}:disabled ~ & {
    border-color: ${({ theme }) => theme.colors.neutral[200]};
    background-color: ${({ theme }) => theme.colors.neutral[200]};
    cursor: default;
  }

  ${HtmlCheckbox}:checked:disabled ~ & {
    background-color: ${({ theme }) => theme.colors.neutral[200]};
    border-color: ${({ theme }) => theme.colors.neutral[200]};
    cursor: default;
  }
`;
