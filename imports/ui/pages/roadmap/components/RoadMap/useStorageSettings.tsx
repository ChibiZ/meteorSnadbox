import React from 'react';
import { DEFAULT_VIEWPORT } from './consts';

const getDataFromStorage = () => {
  try {
    const savedSettings = localStorage.getItem(CACHE_KEY);
    const parsed = JSON.parse(savedSettings);
    return parsed;
  } catch (e) {
    return {};
  }
};
const initSettings = () => {
  const parsed = getDataFromStorage();
  return {
    defaultViewport: DEFAULT_VIEWPORT,
    ...parsed,
  };
};
const CACHE_KEY = 'roadmap_settings';

export function useStorageSettings() {
  const data = React.useRef(initSettings());

  const onSave = React.useCallback((data) => {
    const saved = getDataFromStorage();
    const updatedData = { ...saved, ...data };
    localStorage.setItem(CACHE_KEY, JSON.stringify(updatedData));
    data.current = updatedData;
  }, []);

  return {
    data: data.current,
    onSave,
  };
}
