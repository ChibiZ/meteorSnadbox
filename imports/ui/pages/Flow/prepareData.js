export const prepareNodes = (nodes) => {
  return nodes.map((node) => ({
    ...node,
    type: "selectorNode",
    data: {
      ...node.data,
      kind: node.type,
    },
  }));
};
