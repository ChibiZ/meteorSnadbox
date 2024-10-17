import { Meteor } from 'meteor/meteor';
import { UserProgressCollection } from './UserProgressCollection';

Meteor.methods({
  'userProgress.insert'(tree) {
    return UserProgressCollection.insertAsync(tree);
  },
});

Meteor.methods({
  'userProgress.get'({ roadmapId }) {
    if (!roadmapId) return null;

    const _id = Meteor.userId();

    return UserProgressCollection.findOneAsync(_id, { roadmapId }).then(
      (response) => response?.roadmapId?.[roadmapId] ?? null,
    );
  },
});

Meteor.methods({
  'userProgress.getByUserId'({ roadmapId, id }) {
    if (!roadmapId || !id) return null;

    return UserProgressCollection.findOneAsync(id, { roadmapId }).then(
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

Meteor.methods({
  'userProgress.all': async (data) => {
    if (!data.roadmapId) return null;

    const { roadmapId } = data;

    const [users, usersTasks] = await Promise.all([
      Accounts.users.find({}, { sort: { createdAt: -1 } }).fetchAsync(),
      UserProgressCollection.find({
        [`roadmapId.${roadmapId}`]: { $exists: true },
      }).fetchAsync(),
    ]);

    const aggregatedData = users.map((user) => ({
      id: user._id,
      username: user.username,
      createdAt: user.createdAt,
      role: user.role,
      progress: usersTasks.find((task) => task._id === user._id)?.roadmapId[
        roadmapId
      ],
    }));

    return aggregatedData;
  },
});
