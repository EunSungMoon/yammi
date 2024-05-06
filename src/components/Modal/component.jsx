import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

import ModalContent from './ModalContent';
import useLockedBody from '../../hooks/useScrollLock';

const Component = ({
  size,
  title,
  content,
  children,
  buttons,
  isOpen = false,
  onBackdropClick,
  closeButton,
  noPadding = false,
  back,
  titlePadding = false,
  isFull,
}) => {
  const [mount, setMount] = useState(false);
  const [, setLocked] = useLockedBody();

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    setLocked(isOpen);
  }, [isOpen]);

  if (mount) {
    const portalElement = document.querySelector('#portal');

    if (!portalElement) {
      throw new Error('portal not found');
    }

    return createPortal(
      isOpen ? (
        <Wrapper isFull={isFull}>
          <Backdrop onClick={onBackdropClick} />
          <ModalBox size={size} isFull={isFull}>
            <ModalContent
              title={title}
              content={content}
              buttons={buttons}
              closeButton={closeButton}
              back={back}
              noPadding={noPadding}
              titlePadding={titlePadding}
              isFull={isFull}
            >
              {children}
            </ModalContent>
          </ModalBox>
        </Wrapper>
      ) : null,
      portalElement,
    );
  } else {
    return null;
  }
};

export default Component;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  height: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isFull }) => {
    if (isFull) {
      return css`
        padding: 0;
      `;
    }
  }}
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10001;
  background-color: #8e8e8e;
  opacity: 0.3;
  height: 100%;
`;

const ModalBox = styled.div`
  width: 300px;
  min-width: 200px;
  position: relative;
  z-index: 10002;
  background-color: #fff;
  border-radius: 20px;

  ${({ isFull }) => {
    if (isFull) {
      return css`
        width: 100%;
        height: 100%;
        border-radius: 0;
      `;
    }
  }}
`;
