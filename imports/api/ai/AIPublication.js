import { Meteor } from 'meteor/meteor';
import { AICollection } from './AICollection';

Meteor.publish('AICollection', () => {
  return AICollection.find();
});
