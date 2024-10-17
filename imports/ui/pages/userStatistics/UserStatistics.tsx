import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Loading } from '/imports/ui/components/loading';
import { ProfileInfo } from './components/ProfileInfo';
import { useData } from './useData';
import { TaskTree } from './components/TaskTree';
import { Alert, AlertIcon, Stack } from '@chakra-ui/react';

const UserStatistics = () => {
  const user = useTracker(() => Meteor.user());

  const { isLoading, data, userStat } = useData();

  if (isLoading) return <Loading />;

  console.log(isLoading, data);
  return (
    <div>
      <ProfileInfo user={user} data={userStat} />
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
