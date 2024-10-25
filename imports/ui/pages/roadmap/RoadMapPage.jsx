import React from 'react';

import { usePermissions } from '/imports/ui/hooks/usePermissions';
import { RoadMap } from './components/RoadMap';
import { RoadMapContextProvider } from './RoadMapContext';

export const RoadMapPage = () => {
  const { isAdmin } = usePermissions();

  return (
    <RoadMapContextProvider>
      <RoadMap isReadOnly={!isAdmin} />
    </RoadMapContextProvider>
  );
};
