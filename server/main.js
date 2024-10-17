import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/roadmap';
import '../imports/api/userProgress';
import '../imports/api/accounts/AccountsMethods';

const SEED_USERNAME = 'test';
const SEED_PASSWORD = 'test';

Meteor.startup(async () => {
  Meteor.startup(async () => {
    if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
      await Accounts.createUser({
        username: SEED_USERNAME,
        password: SEED_PASSWORD,
      });
    }

    if (!(await Meteor.users.find({ role: 'Admin' }).countAsync())) {
      Accounts.createUser({
        username: 'admin',
        password: 'admin',
        isAdmin: true,
      });
    }
  });
});
