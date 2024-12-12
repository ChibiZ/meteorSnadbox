import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import '/imports/api/accounts/AccountsMethods';
import '/imports/api/ai';
import '/imports/api/content';
import '/imports/api/roadmap';
import '/imports/api/userProgress';

const SEED_USERNAME = 'test';
const SEED_PASSWORD = 'test';
const SEED_EMAIL = 'test@test.io';
const ADMIN_NAME = 'admin';
const ADMIN_PASSWORD = 'admin5432';
const ADMIN_EMAIL = 'admin@temp.io';

Meteor.startup(async () => {
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      name: SEED_USERNAME,
      email: SEED_EMAIL,
      password: SEED_PASSWORD,
    });
  }
  //backward compatibility
  const user = await Meteor.users.findOneAsync({
    username: 'admin',
    role: 'Admin',
  });

  if (!user.email) {
    await Accounts.addEmailAsync(user._id, ADMIN_EMAIL, false);
    await Meteor.users.updateAsync(user._id, {
      $set: {
        name: ADMIN_NAME,
      },
    });
  }

  if (!(await Meteor.users.find({ role: 'Admin' }).countAsync())) {
    Accounts.createUser({
      name: ADMIN_NAME,
      password: ADMIN_PASSWORD,
      isAdmin: true,
      email: ADMIN_EMAIL,
    });
  }
});
