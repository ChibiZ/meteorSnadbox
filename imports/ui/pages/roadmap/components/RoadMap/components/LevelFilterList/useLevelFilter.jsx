import React from 'react';
import { LEVELS } from './LevelFilterList';

export function useLevelFilter() {
  const [levelFilter, onChangeLevelFilter] = React.useState(LEVELS);

  return {
    levelFilter,
    onChangeLevelFilter,
    isCheckedAll: (levels) => levels.length === LEVELS.length,
  };
}
