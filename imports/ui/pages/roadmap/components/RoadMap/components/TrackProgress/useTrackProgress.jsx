import React from 'react';
import { getStat } from '../../utils';

export function useTrackProgress(rawScheme) {
  const data = React.useMemo(() => {
    return getStat(rawScheme);
  }, [rawScheme]);

  return data;
}
