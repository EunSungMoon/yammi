'use strict';

import { css } from 'styled-components';

export function getTranslate(placement) {
  const position = placement.split('-');
  const relevantPlacement =
    position[1] === 'center' ? position[0] : position[1];

  const translateMap = {
    right: 'translate3d(120%, 0, 0)',
    left: 'translate3d(-120%, 0, 0)',
    bottom: `translate3d(0, 80px, 0)`,
    top: 'translate3d(0, -80px, 0)',
  };

  return translateMap[relevantPlacement];
}

export function getPlacementTransform(placement, transitionStatus) {
  const transitionStyles = {
    unmounted: css``,
    entering: css`
      transform: ${getTranslate(placement)};
    `,
    entered: css`
      transform: translate3d(0, 0, 0);
    `,
    exiting: css`
      transform: ${getTranslate(placement)};
    `,
    exited: css`
      transform: ${getTranslate(placement)};
    `,
  };

  return transitionStyles[transitionStatus];
}

export function getAppearanceWrapperStyle(appearance) {
  switch (appearance) {
    case 'success':
      return css`
        background-color: ${({ theme }) => theme.colors.neutral[500]};
        color: ${({ theme }) => theme.colors.neutral[0]};
      `;
    case 'check':
      return css`
        background-color: ${({ theme }) => theme.colors.neutral[500]};
        color: ${({ theme }) => theme.colors.neutral[0]};
      `;
    case 'error':
      return css`
        background-color: ${({ theme }) => theme.colors.neutral[500]};
        color: ${({ theme }) => theme.colors.neutral[0]};
      `;
    case 'warn':
      return css`
        background-color: ${({ theme }) => theme.colors.neutral[500]};
        color: ${({ theme }) => theme.colors.neutral[0]};
      `;
    case 'info':
      return css`
        background-color: ${({ theme }) => theme.colors.neutral[0]};
        color: ${({ theme }) => theme.colors.neutral[500]};
        border: 1px solid ${({ theme }) => theme.colors.neutral[20]};
      `;
    case 'info-colored':
      return css`
        background-color: ${({ theme }) => theme.colors.neutral[500]};
        color: ${({ theme }) => theme.colors.neutral[0]};
      `;
    default:
      return css``;
  }
}
