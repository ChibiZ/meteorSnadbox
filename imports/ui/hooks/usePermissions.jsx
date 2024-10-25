import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from '/imports/ui/shared';
export function usePermissions() {
  const user = useTracker(() => Meteor.user());

  return {
    isAdmin: user.role === Roles.Admin,
  };
}
