import { Meteor } from 'meteor/meteor';
import { ContentCollection } from './ContentCollection';

Meteor.methods({
  'content.get'() {
    return ContentCollection.find({}).fetchAsync();
  },
});

Meteor.methods({
  'content.getById'({ id }) {
    return ContentCollection.findOneAsync(id);
  },
});

Meteor.methods({
  'content.insert'(data) {
    return ContentCollection.insertAsync(data);
  },
});
