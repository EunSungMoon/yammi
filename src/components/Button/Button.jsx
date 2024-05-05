import styled, { css } from 'styled-components';

import { getButtonStyle } from './style';
import Spinner from '../Spinner';
import Typography from '../Typography';

/**
 *
 * @param {object} props
 * @param {'primary' | 'subtle' | 'ghost'} props.appearance
 * @returns
 */
const Component = ({
  appearance,
  type,
  label,
  block,
  minWidth,
  disabled,
  loading,
  isLink,
  ...buttonProps
}) => {
  const isInverted = () =>
    appearance === 'gray' || appearance === 'subtle' ? false : true;

  return (
    <StyledButton
      minWidth={minWidth}
      block={block}
      disabled={disabled}
      variant={appearance}
      type={type}
      {...buttonProps}
    >
      <Label $loading={loading} $isLink={isLink}>
        {label}
      </Label>
      {loading && (
        <Spinner absoluteTop={true} size={'medium'} inverted={isInverted()} />
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  ${({ block, minWidth }) =>
    block
      ? css`
          display: block;
          width: 100%;
        `
      : minWidth &&
        css`
          min-width: ${minWidth}px;
        `};
  outline: none;
  appearance: none;
  white-space: nowrap;
  overflow: hidden;
  border: none;
  transition: all 120ms ease-in-out;
  border-radius: 6px;
  padding: 13px 16px;

  cursor: pointer;
  ${({ variant }) => getButtonStyle(variant)};
`;

const Label = styled(Typography).attrs({
  variant: 'm',
  component: 'div',
  colorInheritance: true,
  fontWeight: 'regular',
})`
  ${({ $loading }) =>
    $loading &&
    css`
      visibility: hidden;
    `};

  text-decoration: ${({ $isLink }) => ($isLink ? 'underline' : 'none')};
`;

export default Component;
