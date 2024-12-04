export function groupByKey(data, key) {
  return data.reduce((acc, node) => {
    acc[node[key]] = node;

    return acc;
  }, {});
}
