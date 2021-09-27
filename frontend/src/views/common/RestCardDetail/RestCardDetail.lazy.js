import React, { lazy, Suspense } from 'react';

const LazyRestCardDetail = lazy(() => import('./RestCardDetail'));

const RestCardDetail = props => (
  <Suspense fallback={null}>
    <LazyRestCardDetail {...props} />
  </Suspense>
);

export default RestCardDetail;
