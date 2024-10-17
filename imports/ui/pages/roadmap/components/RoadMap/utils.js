import { filterTasksByStatus, TaskStatus } from '../../../../shared';

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

export const setStatusForNodes = (nodes, userProgress) => {
  if (!nodes) return [];
  if (!userProgress) return nodes;

  return nodes.map((node) => {
    const copiedNode = { ...node };

    if (userProgress?.[node.id]) {
      copiedNode.data = {
        ...copiedNode.data,
        ...userProgress[copiedNode.id],
      };
    }

    if (!userProgress?.[node.id] && copiedNode.data.status) {
      delete copiedNode.data.status;
    }

    return copiedNode;
  });
};

export const isNodeTopic = (node) => node.data.kind === 'topic';

export const getTasks = (nodes) => nodes.filter((node) => !isNodeTopic(node));

export const getStat = (nodes, userProgress) => {
  const total = getTasks(nodes ?? []).length;

  const doneTaskCount = filterTasksByStatus(userProgress, TaskStatus.Done);

  const inProgressTaskCount = filterTasksByStatus(
    userProgress,
    TaskStatus.InProgress,
  );

  const percent = Math.floor((doneTaskCount / total) * 100);
  return {
    total,
    doneTaskCount,
    inProgressTaskCount,
    percent,
  };
};
