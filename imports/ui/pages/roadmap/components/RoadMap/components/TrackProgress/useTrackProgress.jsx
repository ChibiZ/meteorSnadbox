import React from 'react';
import { getStat } from '../../utils';

export function useTrackProgress(roadmap, userProgress) {
  const data = React.useMemo(() => {
    return getStat(roadmap.nodes, userProgress);
  }, [userProgress, roadmap]);

  return data;
}
