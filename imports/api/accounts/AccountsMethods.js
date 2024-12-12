const Roles = {
  Member: 'Member',
  Admin: 'Admin',
};
Accounts.onCreateUser((options, user) => {
  const customizedUser = Object.assign(
    {
      role: options.isAdmin ? Roles.Admin : Roles.Member,
      username: options.username,
      password: options.password,
      surname: options.surname,
      grade: options.grade,
      name: options.name,
    },
    user,
  );

  return customizedUser;
});

Accounts._defaultPublishFields.projection = {
  role: 1,
  name: 1,
  surname: 1,
  grade: 1,
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

Meteor.methods({
  'accounts.getById': async ({ id }) => {
    const currentUser = await Meteor.user();
    if (currentUser.role !== Roles.Admin) {
      throw new Meteor.Error(403, 'Forbidden!');
    }

    const user = await Meteor.users.findOneAsync(id);

    return {
      id: user._id,
      name: user.name,
      email: user.emails?.[0]?.address,
      surname: user.surname,
      grade: user.grade,
      role: user.role,
    };
  },
});
