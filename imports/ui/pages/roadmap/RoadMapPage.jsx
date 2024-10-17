import React from 'react';

import { RoadMap } from './components/RoadMap';
import { RoadMapContextProvider } from './RoadMapContext';
import { usePermissions } from '../../hooks/usePermissions';

export const RoadMapPage = () => {
  const { isAdmin } = usePermissions();

  return (
    <RoadMapContextProvider>
      <RoadMap isReadOnly={!isAdmin} />
    </RoadMapContextProvider>
  );
};
