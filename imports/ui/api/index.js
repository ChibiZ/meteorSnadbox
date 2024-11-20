export class RoadMapApi {
  async update({ id, data }) {
    return Meteor.callAsync('roadmap.update', { id, data });
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

export class AIApi {
  async getTemplate() {
    return Meteor.callAsync('aiTemplate.get');
  }
  async addTemplate(template) {
    return Meteor.callAsync('aiTemplate.insert', template);
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

class SkillContentApi {
  getById(id) {
    return Meteor.callAsync('content.getById', {
      id,
    });
  }
}

export const skillContentApi = new SkillContentApi();
export const roadMapApi = new RoadMapApi();
export const aiApi = new AIApi();
export const userProgressApi = new UserProgress();

export const usersApi = new UsersApi();
