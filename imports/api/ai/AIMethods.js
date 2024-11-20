import { Meteor } from 'meteor/meteor';
import { AICollection } from './AICollection';

Meteor.methods({
  'aiTemplate.get'() {
    return AICollection.find({}).fetchAsync();
  },
});

Meteor.methods({
  'aiTemplate.insert'(template) {
    return AICollection.insertAsync({ template: template });
  },
});
