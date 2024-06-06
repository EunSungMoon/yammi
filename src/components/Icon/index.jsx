/**
 * @copyright Copyright © 2022 Corretto, Inc. All rights reserved.
 */
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Component = ({
  reactIconSrc,
  svg,
  onClick,
  backgroundOnhover,
  marginRight,
  hidden,
}) => {
  const renderComponent = () => {
    if (reactIconSrc) {
      return reactIconSrc;
    } else if (svg && svg.src) {
      return (
        <StyledSvgImage src={svg.src} $width={svg.width} $height={svg.height} />
      );
    }
    return null;
  };

  return (
    <Wrapper
      $hasPointer={!!onClick}
      onClick={onClick}
      backgroundOnhover={backgroundOnhover}
      marginRight={marginRight}
      hidden={hidden}
    >
      {renderComponent()}
    </Wrapper>
  );
};

export default Component;

Component.propTypes = {
  reactIconSrc: PropTypes.element,
  svg: PropTypes.shape({
    src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  onClick: PropTypes.func,
  backgroundOnhover: PropTypes.string,
  marginRight: PropTypes.number,
  hidden: PropTypes.bool,
};

Component.defaultProps = {};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ marginRight }) => marginRight && marginRight + 'px'};
  ${({ $hasPointer }) =>
    $hasPointer &&
    css`
      cursor: pointer;
    `};

  ${({ backgroundOnhover }) =>
    backgroundOnhover &&
    css`
      &:hover {
        background-color: ${backgroundOnhover};
      }
    `}
  ${({ hidden }) =>
    hidden &&
    css`
      visibility: hidden;
    `};
`;
const StyledSvgImage = styled.img`
  width: ${({ $width }) => $width && $width + 'px'};
  height: ${({ $height }) => $height && $height + 'px'};
`;
