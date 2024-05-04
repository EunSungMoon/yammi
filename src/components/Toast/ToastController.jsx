'use strict';
import * as React from 'react';
import { Transition } from 'react-transition-group';

import Toast from './Toast';
import { ToastContext } from './ToastContext';

const ToastController = ({ toast }) => {
  let timeout;
  const nodeRef = React.useRef(null); // using findDOMNode which is deprecated in React 에러 방지
  const [isIn, setIsIn] = React.useState(false);

  const { onDismiss, autoDismissTimeout, transitionDuration } =
    React.useContext(ToastContext);
  const dismiss = React.useCallback(id => {
    onDismiss(id);
    setIsIn(false);
  }, []);

  React.useEffect(() => {
    setIsIn(true);

    if (toast.parameters.autoDismiss) {
      timeout = window.setTimeout(() => {
        dismiss(toast.id);
      }, toast.parameters.autoDismissTimeout || autoDismissTimeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Transition
      in={isIn}
      addEndListener={(node, done) => {
        // use the css transitionend event to mark the finish of a transition
        node.addEventListener('transitionend', done, false);
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={transitionDuration}
      nodeRef={nodeRef}
    >
      {transitionStatus => (
        <Toast
          {...toast}
          transitionStatus={transitionStatus}
          dismiss={dismiss}
        />
      )}
    </Transition>
  );
};

export default ToastController;
