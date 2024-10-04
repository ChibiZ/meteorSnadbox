import { Button } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Logout() {
  const user = useTracker(() => Meteor.user());

  const navigate = useNavigate();

  const logout = () => {
    Meteor.logout(() => {
      navigate('/login');
    });
  };
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
