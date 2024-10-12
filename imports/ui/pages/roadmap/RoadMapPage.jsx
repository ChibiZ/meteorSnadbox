import React from 'react';

import { RoadMap } from './components/RoadMap';
import { RoadMapContextProvider } from './RoadMapContext';

export const RoadMapPage = () => {
  return (
    <RoadMapContextProvider>
      <RoadMap />
    </RoadMapContextProvider>
  );
};
