import { filterTasksByStatus, TaskStatus } from '/imports/ui/shared';

export const prepareRoadmapToSave = (data) => {
  return {
    ...data,
    nodes: data.nodes.map((node) => {
      delete node.data.status;

      return {
        ...node,
      };
    }),
  };
};

export const setStatusForNodes = (nodes, rawScheme) => {
  if (!nodes) return [];

  return nodes.map((node) => {
    const copiedNode = { ...node };

    const status =
      rawScheme?.groups[node.id]?.status ?? rawScheme?.skills[node.id]?.status;

    if (status) {
      copiedNode.data = {
        ...copiedNode.data,
        status,
      };
    }

    /// remove status from flow data
    if (
      node.data.kind === 'group' &&
      !rawScheme?.groups[node.id].status &&
      copiedNode.data.status
    ) {
      delete copiedNode.data.status;
    }
    /// remove status from flow data

    if (
      node.data.kind === 'skill' &&
      !rawScheme?.skills[node.id].status &&
      copiedNode.data.status
    ) {
      delete copiedNode.data.status;
    }

    return copiedNode;
  });
};

export const isNodeTopic = (node) =>
  ['block', 'group'].includes(node.data.kind);

export const getTasks = (nodes) => nodes.filter((node) => !isNodeTopic(node));

export const getStat = (rawScheme) => {
  if (!rawScheme) {
    return { total: 0, doneTaskCount: 0, inProgressTaskCount: 0, percent: 0 };
  }
  const skills = Object.values(rawScheme.skills);
  const total = skills.length;

  const doneTaskCount = skills.filter(
    ({ status }) => status === TaskStatus.Done,
  ).length;

  const inProgressTaskCount = skills.filter(
    ({ status }) => status === TaskStatus.InProgress,
  ).length;

  const percent = Math.floor((doneTaskCount / total) * 100);
  return {
    total,
    doneTaskCount,
    inProgressTaskCount,
    percent,
  };
};
