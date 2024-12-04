import React from 'react';
import { Tracker } from 'meteor/tracker';

export function useAppReady() {
  const [isReady, setReady] = React.useState(false);

  React.useEffect(() => {
    Tracker.autorun(async () => {
      const user = await Accounts.userAsync();
      let isConfigured = Accounts.loginServicesConfigured();

      if (user === null || isConfigured) setReady(true);
    });
  }, []);

  return isReady;
}
