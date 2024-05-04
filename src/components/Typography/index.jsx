import styled from 'styled-components';

import { variantFontWeightStyles, variantStyles } from './styles';

/**
 *
 * @param {Object} props
 * @param {'bold' | 'medium' | 'regular'} props.fontWeight
 * @param {'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'} props.variant
 * @returns
 */

const Component = ({
  variant,
  component = 'div',
  children,
  colorInheritance,
  fontWeight,
  ...rest
}) => {
  return (
    <Typography
      as={component}
      variant={variant}
      fontWeight={fontWeight}
      colorInheritance={colorInheritance}
      {...rest}
    >
      {children}
    </Typography>
  );
};

const Typography = styled.div`
  color: ${({ colorInheritance, theme }) =>
    colorInheritance ? 'inherit' : theme.colors.neutral[900]};
  line-height: 150%;
  font-style: normal;
  ${({ variant }) => variantStyles[variant]};
  ${({ fontWeight }) => variantFontWeightStyles[fontWeight]};
`;

export default Component;
