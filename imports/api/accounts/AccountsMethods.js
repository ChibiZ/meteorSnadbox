const Roles = {
  Member: 'Member',
  Admin: 'Admin',
};
Accounts.onCreateUser((options, user) => {
  const customizedUser = Object.assign(
    {
      role: options.isAdmin ? Roles.Admin : Roles.Member,
    },
    user,
  );

  return customizedUser;
});

Accounts._defaultPublishFields.projection = {
  role: 1,
  ...Accounts._defaultPublishFields.projection,
};

Meteor.methods({
  'accounts.update': async ({ id, data }) => {
    const currentUser = await Meteor.user();
    if (currentUser.role !== Roles.Admin) {
      throw new Meteor.Error(403, 'Forbidden!');
    }

    return Meteor.users.updateAsync(id, {
      $set: data,
    });
  },
});

Meteor.methods({
  'accounts.remove': async ({ id }) => {
    const currentUser = await Meteor.user();
    if (currentUser.role !== Roles.Admin) {
      throw new Meteor.Error(403, 'Forbidden!');
    }

    return Meteor.users.removeAsync(id);
  },
});
