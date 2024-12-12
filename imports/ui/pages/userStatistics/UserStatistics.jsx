import React from 'react';
import { Alert, AlertIcon, Stack } from '@chakra-ui/react';

import { Loading } from '/imports/ui/components/loading';
import { ProfileInfo } from './components/ProfileInfo';
import { useData } from './useData';
import { TaskTree } from './components/TaskTree';

const UserStatistics = () => {
  const { isLoading, data, userData } = useData();

  if (isLoading) return <Loading />;

  return (
    <div style={{ overflow: 'auto', maxHeight: '100%' }}>
      <ProfileInfo data={userData} />
      {data ? (
        <TaskTree data={data} />
      ) : (
        <Stack spacing={3} py={2}>
          <Alert status="warning">
            <AlertIcon />
            Нет данных
          </Alert>
        </Stack>
      )}
    </div>
  );
};

export default UserStatistics;
