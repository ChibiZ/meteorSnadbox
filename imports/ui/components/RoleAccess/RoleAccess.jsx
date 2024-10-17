import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

export const RoleAccess = ({ roles, children = [] }) => {
  const user = useTracker(() => Meteor.user());

  return !roles.length || roles.includes(user?.role) ? (
    children
  ) : (
    <Alert status="error" mt={5}>
      <AlertIcon />
      <AlertTitle>Нет доступа!</AlertTitle>
    </Alert>
  );
};
