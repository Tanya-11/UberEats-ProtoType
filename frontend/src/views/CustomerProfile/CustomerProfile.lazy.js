import React, { lazy, Suspense } from 'react';

const LazyCustomerProfile = lazy(() => import('./CustomerProfile'));

const CustomerProfile = props => (
  <Suspense fallback={null}>
    <LazyCustomerProfile {...props} />
  </Suspense>
);

export default CustomerProfile;
