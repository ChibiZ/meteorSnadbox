export class RoadMapApi {
  async update({ id, data }) {
    return Meteor.callAsync('roadmap.update', { _id: id, data });
  }

  async create(data) {
    return Meteor.callAsync('roadmap.insert', data);
  }

  async getList() {
    return Meteor.callAsync('roadmap.get');
  }
  async getById(id) {
    return Meteor.callAsync('roadmap.getById', { id });
  }

  async getSchemeWithProgress({ id, userId }) {
    return Meteor.callAsync('roadmap.getSchemeWithProgress', { id, userId });
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

  async getUserProgressById({ roadmapId, id }) {
    return Meteor.callAsync('userProgress.getByUserId', {
      roadmapId,
      id,
    });
  }

  async getCurrentUserProgressByRoadMap({ roadmapId }) {
    return Meteor.callAsync('userProgress.get', {
      roadmapId,
    });
  }
  async getAllUsersProgressByRoadMap({ roadmapId }) {
    return Meteor.callAsync('userProgress.all', {
      roadmapId,
    });
  }
}

export class UsersApi {
  async update({ id, data }) {
    await Meteor.callAsync('accounts.update', {
      id,
      data,
    });
  }

  async remove(id) {
    await Meteor.callAsync('accounts.remove', {
      id,
    });
  }
}

export const roadMapApi = new RoadMapApi();
export const userProgressApi = new UserProgress();

export const usersApi = new UsersApi();
