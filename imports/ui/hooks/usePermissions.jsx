import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from '../shared';
export function usePermissions() {
  const user = useTracker(() => Meteor.user());

  return {
    isAdmin: user.role === Roles.Admin,
  };
}
