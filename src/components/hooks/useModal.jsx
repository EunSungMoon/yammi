import { useCallback, useState } from 'react';

import Modal from '../Modal';

export default function useModal(size = 'sm', closeCallback) {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(async () => {
    setOpen(false);
    if (closeCallback) {
      await closeCallback();
    }
  }, [closeCallback]);

  const handleBackdropClick = useCallback(e => {
    e.stopPropagation();
    close();
  });

  /**
   *
   * @param {object} props
   * @param {{onClick: function(), label: string, loading: boolean, appearance: 'primary' | 'warning' | 'danger' | 'gray' | 'subtle'}[]} props.buttons
   * @returns
   */
  const ModalWrapper = useCallback(
    ({
      title,
      content,
      buttons = [],
      children,
      back,
      closeButton,
      noPadding,
      titlePadding,
    }) => (
      <Modal
        size={size}
        title={title}
        content={content}
        buttons={buttons}
        onBackdropClick={handleBackdropClick}
        isOpen={isOpen}
        closeButton={closeButton && close}
        back={back}
        noPadding={noPadding}
        titlePadding={titlePadding}
      >
        {children}
      </Modal>
    ),
    [isOpen, close],
  );

  return { open, close, isOpen, ModalWrapper };
}
