import React, { Suspense } from 'react';

import { UIProvider } from './components/ui-provider';
import { Loading } from './components/loading';
import { Routes } from './routes';
import { Tracker } from 'meteor/tracker';

import './styles/styles.css';

export const App = () => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let tracker = Tracker.autorun(() => {
      if (Accounts.loginServicesConfigured()) {
        setLoading(false);
      }
    });

    return () => tracker.stop();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <UIProvider>
      <Routes />
    </UIProvider>
  );
};
