'use strict';

import * as React from 'react';

export const ToastPlacement = [
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'top-left',
  'top-center',
  'top-right',
];

export const toastAppearance = {
  success: 'success',
  error: 'error',
  warn: 'warn',
  info: 'info',
  default: 'default',
};

// set default option
export const initialToastStore = {
  addToast: () => {},
  removeToast: () => {},
  onDismiss: () => {},
  autoDismissTimeout: 3000,
  transitionDuration: 300,
  placement: 'bottom-center',
};

export const ToastContext = React.createContext(initialToastStore);
