import Lottie from 'lottie-react';
import styled, { css } from 'styled-components';

import LoaderIntervedLogo from './loader-inverted.json';
import LoaderLogo from './loader.json';
import { renderClipLoaderSize } from './style';

/**
 *
 * @param {object} props
 * @param {'smallest' | 'small' | 'medium' | 'big' | 'biggest'} props.size
 * @returns
 */

const Component = ({
  size = 'smallest',
  inverted = false,
  absoluteTop = false,
  center = false,
  noStyle = false,
}) => {
  return (
    <Wrapper absoluteTop={absoluteTop} isCenter={center} noStyle={noStyle}>
      <Lottie
        animationData={inverted ? LoaderIntervedLogo : LoaderLogo}
        loop
        autoplay
        style={{
          width: renderClipLoaderSize(size),
          height: renderClipLoaderSize(size),
        }}
      ></Lottie>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ noStyle }) =>
    noStyle
      ? css``
      : css`
          ${({ absoluteTop }) =>
            absoluteTop &&
            css`
              top: 0;
              display: flex;
              justify-content: center;
            `};
          ${({ isCenter }) =>
            isCenter &&
            css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          left: 0;
          right: 0;

          margin-left: auto;
          margin-right: auto;

          position: absolute;
          z-index: 999;
          height: 100%;
        `}
`;

export default Component;
