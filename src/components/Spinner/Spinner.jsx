import Lottie from 'lottie-react';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import DefaultLoader from './defaultLottie.json';
import LoaderIntervedLogo from './invertDefaultLottie.json';
import LoaderLogo from './lottie.json';
import { renderClipLoaderSize } from './style';

/**
 *
 * @param {object} props
 * @param {'s' | 'm' | 'l' } props.size
 * @param {'default' | 'primary'  } props.type
 * @returns
 */

const Component = ({
  size = 's',
  inverted = false,
  absoluteTop = false,
  center = false,
  type = 'default',
}) => {
  const renderAnimation = useMemo(() => {
    if (type === 'default') {
      if (inverted) {
        return LoaderIntervedLogo;
      } else {
        return DefaultLoader;
      }
    } else {
      return LoaderLogo;
    }
  }, [type, inverted]);
  return (
    <Wrapper absoluteTop={absoluteTop} isCenter={center}>
      <Lottie
        animationData={renderAnimation}
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
  left: 0;
  right: 0;

  margin-left: auto;
  margin-right: auto;

  position: absolute;
  z-index: 999;
  height: 100%;
  display: flex;
  justify-content: center;

  ${({ absoluteTop }) => {
    if (absoluteTop) {
      return css`
        top: 0;
      `;
    }
  }}
  ${({ isCenter }) => {
    if (isCenter) {
      return css`
        align-items: center;
        top: 0%;
      `;
    }
  }}
`;

export default Component;
