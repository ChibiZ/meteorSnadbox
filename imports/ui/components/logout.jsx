import { Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useAuth } from '/imports/ui/pages/auth/useAuth';

export function Logout() {
  const user = useTracker(() => Meteor.user());
  const { logout } = useAuth();

  return (
    <>
      {user && (
        <Button fontSize="sm" fontWeight={400} onClick={logout}>
          Выйти
        </Button>
      )}
    </>
  );
}
