import * as React from 'react';
import { createPortal } from 'react-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import styled, { css } from 'styled-components';

const placements = {
  'top-left': css`
    top: 0px;
    left: 0px;
  `,
  'top-center': css`
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
  `,
  'top-right': css`
    top: 0px;
    right: 0px;
  `,
  'bottom-left': css`
    bottom: 0px;
    left: 0px;
  `,
  'bottom-center': css`
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
  `,
  'bottom-right': css`
    bottom: 80px;
    right: 50px;
    ${({ theme }) => theme.responsive('sm')} {
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
    }
  `,
};

const ToasterContainer = styled.div`
  position: fixed;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 8px;
  z-index: 10002;
  pointer-events: ${({ hasChildren }) => (hasChildren ? 'auto' : 'none')};
  ${({ placement }) => placements[placement]};

  ${({ theme }) => theme.responsive('sm')} {
    width: 100%;
  }
`;

const Toaster = ({ children, placement }) => {
  const [mountNode, setMountNode] = React.useState(undefined);
  React.useEffect(() => setMountNode(document.body));

  return mountNode
    ? createPortal(
        <ToasterContainer
          hasChildren={!!React.Children.count(children)}
          placement={placement}
        >
          <TransitionGroup component={null}>{children}</TransitionGroup>
        </ToasterContainer>,
        mountNode,
      )
    : null;
};

export default Toaster;
