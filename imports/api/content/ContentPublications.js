import { Meteor } from 'meteor/meteor';
import { ContentCollection } from './ContentCollection';

Meteor.publish('content', () => {
  return ContentCollection.find();
});
