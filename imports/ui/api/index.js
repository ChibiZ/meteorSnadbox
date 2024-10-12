export class RoadMapApi {
  async update({ id, data }) {
    return Meteor.callAsync('roadmap.update', { _id: id, data });
  }

  async create({ data }) {
    return Meteor.callAsync('roadmap.insert', data);
  }

  async getList() {
    return Meteor.callAsync('roadmap.get');
  }
}

export class UserProgress {
  async resetTask({ id, roadmapId }) {
    return Meteor.callAsync('userProgress.reset', {
      _id: id,
      roadmapId,
    });
  }
  async updateTask({ id, status, roadmapId }) {
    return Meteor.callAsync('userProgress.update', {
      _id: id,
      status,
      roadmapId,
    });
  }

  async getUserProgressByRoadMap({ roadmapId }) {
    return Meteor.callAsync('userProgress.get', {
      roadmapId,
    });
  }
}

export const roadMapApi = new RoadMapApi();
export const userProgressApi = new UserProgress();
