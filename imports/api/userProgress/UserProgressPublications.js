import { Meteor } from 'meteor/meteor';
import { UserProgressCollection } from './UserProgressCollection';

Meteor.publish('userProgress', () => {
  return UserProgressCollection.find();
});
