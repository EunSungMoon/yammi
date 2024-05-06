import { useCallback, useState } from 'react';

import ConfirmModal from '../components/ConfirmModal';

export default function useConfirm(size = 'sm', closeCallback) {
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
  const ConfirmModalWrapper = useCallback(
    ({ content, buttons = [], children }) => (
      <ConfirmModal
        content={content}
        buttons={buttons}
        onBackdropClick={handleBackdropClick}
        isOpen={isOpen}
      >
        {children}
      </ConfirmModal>
    ),
    [isOpen, close],
  );

  return { open, close, isOpen, ConfirmModalWrapper };
}
