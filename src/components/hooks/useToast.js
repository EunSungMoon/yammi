'use strict';

import { useContext } from 'react';

import { ToastContext } from '@components/Toast/ToastContext';

export const useToast = () => {
  const { addToast, removeToast } = useContext(ToastContext);
  return { addToast, removeToast };
};
