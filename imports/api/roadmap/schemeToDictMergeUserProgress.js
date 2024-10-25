import { TaskStatus } from './RoadmapMethods';

export function schemeToDictMergeUserProgress({ scheme, userProgress }) {
  const blocks = scheme.reduce((acc, block) => {
    const { groups, ...rest } = block;

    acc[block.id] = rest;

    acc[block.id].children = groups.map(({ id }) => id);
    return acc;
  }, {});

  const groups = scheme
    .flatMap((block) => block.groups)
    .reduce((acc, group) => {
      const { skills, ...rest } = group;

      acc[group.id] = rest;
      acc[group.id].children = skills.map(({ id }) => id);

      const allSkillDone = !skills.some(
        (skill) => userProgress?.[skill.id]?.status !== TaskStatus.Done,
      );

      if (allSkillDone) {
        acc[group.id].status = TaskStatus.Done;
      }

      return acc;
    }, {});

  const skills = scheme
    .flatMap((block) => block.groups)
    .flatMap((group) => group.skills)
    .reduce((acc, skill) => {
      acc[skill.id] = skill;

      if (userProgress?.[skill.id]) {
        acc[skill.id].status = userProgress?.[skill.id].status;
      }
      return acc;
    }, {});

  return {
    blocks,
    groups,
    skills,
  };
}
