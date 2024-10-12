import { Meteor } from 'meteor/meteor';
import { RoadmapsCollection } from './RoadmapCollection';

Meteor.methods({
  'roadmap.get'() {
    return RoadmapsCollection.find({}).fetchAsync();
  },
});

Meteor.methods({
  'roadmap.insert'(tree) {
    return RoadmapsCollection.insertAsync(tree);
  },
});

Meteor.methods({
  'roadmap.update'({ _id, data }) {
    return RoadmapsCollection.updateAsync(_id, {
      $set: data,
    });
  },
});
