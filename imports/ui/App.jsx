import React, { Suspense } from 'react';

import { UIProvider } from './components/ui-provider';
import { Loading } from './components/loading';
import { Routes } from './routes';
import { Tracker } from 'meteor/tracker';

import './styles/styles.css';

export const App = () => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Tracker.autorun(async (c) => {
      const user = await Accounts.userAsync();
      let isConfigured = Accounts.loginServicesConfigured();

      if (user === null || isConfigured) setLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <UIProvider>
      <Routes />
    </UIProvider>
  );
};
