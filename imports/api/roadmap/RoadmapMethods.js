import { Meteor } from 'meteor/meteor';
import { RoadmapsCollection } from './RoadmapCollection';
import { UserProgressCollection } from '../userProgress/UserProgressCollection';
import { schemeToDictMergeUserProgress } from './schemeToDictMergeUserProgress';

export const TaskStatus = {
  Done: 'Done',
  InProgress: 'InProgress',
  Reset: 'Reset',
};

Meteor.methods({
  'roadmap.get'() {
    return RoadmapsCollection.find({}).fetchAsync();
  },
});

Meteor.methods({
  'roadmap.getById'({ id }) {
    return RoadmapsCollection.findOneAsync(id);
  },
});

Meteor.methods({
  'roadmap.getSchemeWithProgress': async ({ id, userId }) => {
    if (!userId) {
      userId = Meteor.userId();
    }

    const roadmap = await RoadmapsCollection.findOneAsync(id);
    const userProgress = await UserProgressCollection.findOneAsync(userId, {
      roadmapId: id,
    }).then((response) => response?.roadmapId?.[id] ?? null);

    return {
      id,
      flowData: roadmap.flowData,
      rawScheme: schemeToDictMergeUserProgress({
        scheme: roadmap.rawScheme,
        userProgress,
      }),
    };
  },
});

Meteor.methods({
  'roadmap.insert'(tree) {
    return RoadmapsCollection.insertAsync(tree);
  },
});

Meteor.methods({
  'roadmap.update'({ id, data }) {
    return RoadmapsCollection.updateAsync(id, {
      $set: {
        flowData: data,
      },
    });
  },
});
