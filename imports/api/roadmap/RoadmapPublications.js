import { Meteor } from 'meteor/meteor';
import { RoadmapsCollection } from './RoadmapCollection';

Meteor.publish('roadmaps', () => {
  return RoadmapsCollection.find();
});
