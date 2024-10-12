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
