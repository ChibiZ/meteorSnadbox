import { filterTasksByStatus, TaskStatus } from '/imports/ui/shared';

export const prepareRoadmapToSave = (data) => {
  return {
    ...data,
    nodes: data.nodes.map((node) => {
      delete node.data.status;
      delete node.hidden;

      return {
        ...node,
      };
    }),
  };
};

const getStatus = (node, rawScheme) => {
  if (node.data.kind === 'group') return rawScheme?.groups[node.id]?.status;

  if (node.data.kind === 'skill') return rawScheme?.skills[node.id]?.status;
};

export const setStatusForNodes = (nodes, rawScheme) => {
  if (!nodes) return [];

  return nodes.map((node) => {
    const copiedNode = structuredClone(node);

    const status = getStatus(copiedNode, rawScheme);

    if (status) {
      copiedNode.data = {
        ...copiedNode.data,
        status,
      };
    }

    /// remove status from flow data
    const groupStatusHasRemoved =
      copiedNode.data.kind === 'group' &&
      !rawScheme?.groups[copiedNode.id]?.status &&
      copiedNode.data.status;

    if (groupStatusHasRemoved) {
      delete copiedNode.data.status;
    }

    /// remove status from flow data
    const skillStatusHasRemoved =
      copiedNode.data.kind === 'skill' &&
      !rawScheme?.skills[copiedNode.id]?.status &&
      copiedNode.data.status;

    if (skillStatusHasRemoved) {
      delete copiedNode.data.status;
    }

    return copiedNode;
  });
};

export const isSkillNode = (node) => node.data.kind === 'skill';

export const getTasks = (nodes) => nodes.filter((node) => isSkillNode(node));

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

export const isBlock = (item) => 'block' in item;
export const isGroup = (item) => 'group' in item;
export const isSkill = (item) => 'skill' in item;

export const getChildKey = (item) => {
  if (isBlock(item)) return 'groups';
  if (isGroup(item)) return 'skills';
};
export const getTitle = (item) => {
  if (isBlock(item)) return item.block;
  if (isGroup(item)) return item.group;

  return item.skill;
};

export function getFlatDictFromTree(data, result = {}) {
  for (const item of data) {
    result[item.id] = {
      ...item,
      title: getTitle(item),
    };

    const childKey = getChildKey(item);

    if (Array.isArray(item[childKey])) {
      getFlatDictFromTree(item[childKey], result);
    }
  }

  return result;
}
