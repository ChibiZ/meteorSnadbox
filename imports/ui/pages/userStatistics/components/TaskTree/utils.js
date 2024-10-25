const toDictById = (arr) =>
  arr.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: cur,
    }),
    {},
  );
export function filterByStatuses(data, statuses) {
  const skills = toDictById(
    Object.values(data.skills).filter((skill) => {
      return statuses.includes(skill.status);
    }),
  );

  const groups = toDictById(
    Object.values(data.groups)
      .map((group) => ({
        ...group,
        children: group.children.filter((skillId) => skills[skillId]),
      }))
      .filter((group) => group.children.length),
  );

  const blocks = toDictById(
    Object.values(data.blocks)
      .map((block) => ({
        ...block,
        children: block.children.filter((groupId) => groups[groupId]),
      }))
      .filter((block) => block.children.length),
  );

  console.log({ blocks, skills, groups });
  return {
    blocks,
    skills,
    groups,
  };
}
