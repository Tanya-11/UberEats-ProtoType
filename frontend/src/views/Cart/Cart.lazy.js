import React, { lazy, Suspense } from 'react';

const LazyCart = lazy(() => import('./Cart'));

const Cart = props => (
  <Suspense fallback={null}>
    <LazyCart {...props} />
  </Suspense>
);

export default Cart;
