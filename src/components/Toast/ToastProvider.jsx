import { useCallback, useMemo, useReducer } from 'react';

import { ToastContext, initialToastStore } from './ToastContext';
import ToastController from './ToastController';
import Toaster from './Toaster';

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, toasts: [...state.toasts, action.value] };
    case 'REMOVE':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.id),
      };
    default:
      return state;
  }
}

const ToastProvider = ({ children, placement = 'bottom-center' }) => {
  const [state, dispatch] = useReducer(toastReducer, {
    ...initialToastStore,
    placement,
    toasts: [],
  });

  const addToast = useCallback(parameters => {
    const id = Math.random().toString(36).substr(2, 9);
    const defaultParameters = {
      autoDismiss: true,
      appearance: 'primary',
    };

    const _parameters = Object.assign(defaultParameters, parameters);
    const toast = { id, parameters: _parameters };

    dispatch({ type: 'ADD', value: toast, id: toast.id });
  }, []);

  const removeToast = useCallback(id => {
    dispatch({ type: 'REMOVE', id: id });
  }, []);

  const onDismiss = useCallback(id => removeToast(id), []);

  const provideProps = useMemo(
    () => ({ ...state, addToast, removeToast, onDismiss }),
    [],
  );

  return (
    <ToastContext.Provider value={provideProps}>
      {children}
      <Toaster placement={placement}>
        {state.toasts.map(toast => (
          <ToastController key={toast.id} toast={toast} />
        ))}
      </Toaster>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
