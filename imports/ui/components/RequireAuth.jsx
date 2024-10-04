import { useLocation, Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';

export function RequireAuth({ children }) {
  const user = useTracker(() => Meteor.user());

  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
