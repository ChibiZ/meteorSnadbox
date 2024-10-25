import { Meteor } from 'meteor/meteor';
import { ContentCollection } from './ContentCollection';

// type Content {
//   title:string;
//   text:string;
// }

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
