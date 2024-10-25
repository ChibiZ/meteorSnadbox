import React from 'react';
import { skillContentApi } from '/imports/ui/api';

export function useContent({ id }) {
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    skillContentApi.getById(id).then(setData);
  }, []);

  return {
    isLoading,
    data,
  };
}
