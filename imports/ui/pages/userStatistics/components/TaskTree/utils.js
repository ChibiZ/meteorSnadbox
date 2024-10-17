export const getTreeFromFlowObject = (nodes, edges) => {
  const map = new Map(
    nodes.map((node) => [node.id, { ...node, children: [] }]),
  );
  for (const { source, target } of edges) map.get(source).children.push(target);

  const tree = [...map.values()].filter((node) => node.children.length);

  return tree;
};

export const normalizeTreeData = (tree, nodes) => {
  const nodesById = nodes.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: cur,
    }),
    {},
  );

  const getDataFromNode = (node) => ({
    id: node.id,
    ...node.data,
  });

  return tree.map((node) => {
    const newNode = getDataFromNode(node);

    if (node.children) {
      newNode.children = node.children.map((childNode) =>
        getDataFromNode(nodesById[childNode]),
      );
    }

    return newNode;
  });
};

export const mergeTreeWithUserProgress = (tree, userProgress) => {
  if (!userProgress) return tree;

  return tree.map((node) => ({
    ...node,
    children: node.children?.map((childNode) => ({
      ...childNode,
      ...userProgress[childNode.id],
    })),
  }));
};
