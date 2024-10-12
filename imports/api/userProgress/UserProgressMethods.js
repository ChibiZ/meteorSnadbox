import { Meteor } from 'meteor/meteor';
import { UserProgressCollection } from './UserProgressCollection';

Meteor.methods({
  'userProgress.insert'(tree) {
    return UserProgressCollection.insertAsync(tree);
  },
});

Meteor.methods({
  'userProgress.get'(data) {
    if (!data.roadmapId) return null;

    const { roadmapId } = data;
    const _id = Meteor.userId();

    console.log('userProgress.get', 'user = ', _id);
    return UserProgressCollection.findOneAsync(_id, { roadmapId }).then(
      (response) => response?.roadmapId?.[roadmapId] ?? null,
    );
  },
});

Meteor.methods({
  'userProgress.update'({ _id, status, roadmapId }) {
    const userId = Meteor.userId();
    return UserProgressCollection.updateAsync(
      userId,
      {
        $set: {
          [`roadmapId.${roadmapId}.${_id}.status`]: status,
        },
      },
      { upsert: true },
    );
  },
});

Meteor.methods({
  'userProgress.reset'({ _id, roadmapId }) {
    const userId = Meteor.userId();
    return UserProgressCollection.updateAsync(
      userId,
      {
        $unset: {
          [`roadmapId.${roadmapId}.${_id}`]: 1,
        },
      },
      { upsert: true },
    );
  },
});
