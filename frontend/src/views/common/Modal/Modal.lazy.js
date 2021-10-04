import React, { lazy, Suspense } from 'react';

const LazyModal = lazy(() => import('./Modal'));

const Modal = props => (
  <Suspense fallback={null}>
    <LazyModal {...props} />
  </Suspense>
);

export default Modal;
