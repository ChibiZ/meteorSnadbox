import React from 'react';
import { UIProvider } from './components/UIProvider';
import { Loading } from './components/loading';
import { Routes } from './routes/routes';

import './styles/styles.css';
import { useAppReady } from './hooks/useAppReady';

export const App = () => {
  const isReady = useAppReady();

  if (!isReady) return <Loading />;

  return (
    <UIProvider>
      <Routes />
    </UIProvider>
  );
};
