import { getWidthNode } from './utils';
import { Edge, FlowDataScheme, Node } from './types';
import { SUB_TOPIC_EDGE_STYLES, TOPIC_EDGE_STYLES } from './consts';
import { v7 } from 'uuid';

const HEIGHT_NODE = 60;

const getNodeWidth = (str: string) => {
  const NODE_PADDING = 33;
  let width = getWidthNode(str) + NODE_PADDING;

  return width;
};

type GenNodeParams = {
  title;
  width: Node['width'];
  x: Node['position']['x'];
  y: Node['position']['y'];
  kind: Node['data']['kind'];
  id: string;
  color?: string;
  level?: string;
  priority?: string;
};
const generateNode = ({
  width,
  x,
  y,
  kind,
  title,
  id,
  level,
  priority,
}: GenNodeParams): Node => {
  return {
    id,
    type: 'customNode',
    width,

    data: {
      label: title,
      kind,
      level,
      priority,
    },

    position: {
      x,
      y,
    },
  };
};

const createEdge = ({
  id,
  source,
  target,
  sourceHandle,
  targetHandle,
  kind,
}) => {
  return {
    id,
    source,
    target,
    data: {
      edgeStyle: 'dashed',
    },
    sourceHandle,
    targetHandle,
    style: kind === 'topic' ? TOPIC_EDGE_STYLES : SUB_TOPIC_EDGE_STYLES,
  } as const;
};

export const getNodes = (data: Scheme) => {
  const X_SPACES_BETWEEN_GROUPS = 150;
  const Y_SPACES_BETWEEN_GROUPS = 50;
  const Y_SPACES_BETWEEN_SKILLS = 10;

  const nodes: Node[] = [];
  let baseOffsetY = 0;

  data.forEach((block) => {
    const blockWidth = getNodeWidth(block.block);

    const blockX = -blockWidth / 2;
    const blockY = baseOffsetY;

    nodes.push(
      generateNode({
        title: block.block,
        id: block.id,
        width: blockWidth,
        x: blockX,
        y: blockY,
        kind: 'block',
      }),
    );

    const generateSkills = ({
      data,
      groupX,
      startY,
      type,
      groupWidth,
    }: {
      data: Skill[];
      groupX: number;
      groupWidth: number;
      startY: number;
      type: 'left' | 'right';
    }) => {
      let skillsStartOffsetY = startY;
      const skillBox = (data.length - 1) * (HEIGHT_NODE + 10);

      data.forEach((skill, skillIndex) => {
        const skillWidth = getNodeWidth(skill.skill);

        const leftCalc = () => groupX - skillWidth - X_SPACES_BETWEEN_GROUPS;
        const rightCalc = () => groupX + groupWidth + X_SPACES_BETWEEN_GROUPS;

        const skillX = type === 'left' ? leftCalc() : rightCalc();
        const skillY = skillsStartOffsetY;

        nodes.push(
          generateNode({
            title: skill.skill,
            id: skill.id,
            width: skillWidth,
            x: skillX,
            y: skillY,
            kind: 'skill',
            level: skill.level,
            priority: skill.priority,
          }),
        );

        skillsStartOffsetY += HEIGHT_NODE + Y_SPACES_BETWEEN_SKILLS;
      });

      return {
        centerY: Math.max(skillBox / 2, HEIGHT_NODE / 2),
        bottomY: skillsStartOffsetY,
      };
    };

    const generateGroupsNodes = (
      groups: Group[],
      type: 'left' | 'right',
      start: number,
    ) => {
      let groupsStartOffsetY = start;

      groups.forEach((group, groupIndex) => {
        const groupWidth = getNodeWidth(group.group);

        const leftCalc = () => blockX - groupWidth - X_SPACES_BETWEEN_GROUPS;
        const rightCalc = () => blockX + blockWidth + X_SPACES_BETWEEN_GROUPS;

        const x = type === 'left' ? leftCalc() : rightCalc();

        const groupX = x;

        const { bottomY, centerY } = generateSkills({
          data: group.skills,
          groupX,
          startY: groupsStartOffsetY,
          type,
          groupWidth,
        });
        const groupY = groupsStartOffsetY + centerY;

        nodes.push(
          generateNode({
            title: group.group,
            id: group.id,
            width: groupWidth,
            x: groupX,
            y: groupY,
            kind: 'group',
          }),
        );

        groupsStartOffsetY = Y_SPACES_BETWEEN_GROUPS + bottomY;
      });

      return {
        bottomGroupY: groupsStartOffsetY,
      };
    };

    const middleBlockCount = Math.round(block?.groups.length / 2);

    const leftNodes = block?.groups.slice(0, middleBlockCount);
    const rightNodes = block?.groups?.slice(middleBlockCount);

    const { bottomGroupY: bottomGroupLeftY } = generateGroupsNodes(
      leftNodes,
      'left',
      baseOffsetY,
    );

    const { bottomGroupY: bottomGroupRightY } = generateGroupsNodes(
      rightNodes,
      'right',
      baseOffsetY,
    );

    baseOffsetY = Math.max(bottomGroupLeftY, bottomGroupRightY);
  });
  return nodes;
};

export const getEdges = (data: Scheme) => {
  const edges: Edge[] = [];

  let prevRootNode = null;

  data.forEach((block) => {
    if (!prevRootNode) {
      prevRootNode = block;
    } else {
      edges.push(
        createEdge({
          id: block.id + prevRootNode.id,
          source: prevRootNode.id,
          target: block.id,
          sourceHandle: 'x2',
          targetHandle: 'w1',
          kind: 'topic',
        }),
      );
    }

    const middle = Math.round(block?.groups.length / 2);

    const leftGroups = block?.groups.slice(0, middle);
    const rightGroups = block?.groups.slice(middle);

    leftGroups.forEach((group) => {
      edges.push(
        createEdge({
          id: block.id + group.id,
          source: block.id,
          target: group.id,
          sourceHandle: 'y2',
          targetHandle: 'z1',
          kind: 'subtopic',
        }),
      );

      group.skills.forEach((skill) => {
        edges.push(
          createEdge({
            id: group.id + skill.id,
            source: group.id,
            target: skill.id,
            sourceHandle: 'y2',
            targetHandle: 'z1',
            kind: 'subtopic',
          }),
        );
      });
    });

    rightGroups.forEach((group) => {
      edges.push(
        createEdge({
          id: block.id + group.id,
          source: block.id,
          target: group.id,
          sourceHandle: 'z2',
          targetHandle: 'y1',
          kind: 'subtopic',
        }),
      );

      group.skills.forEach((skill) => {
        edges.push(
          createEdge({
            id: group.id + skill.id,
            source: group.id,
            target: skill.id,
            sourceHandle: 'z2',
            targetHandle: 'y1',
            kind: 'subtopic',
          }),
        );
      });
    });

    prevRootNode = block;
  });

  return edges;
};

function addIdForItems(data) {
  const enchancedData: Scheme = data.map((block) => ({
    ...block,
    id: v7(),
    groups: block.groups.map((group) => ({
      ...group,
      id: v7(),
      skills: group.skills.map((skill) => ({
        ...skill,
        id: v7(),
      })),
    })),
  }));
  return enchancedData;
}
type Priority = string;
type Level = string;

type Skill = {
  level: Level;
  priority: Priority;
  skill: string;
  id: string;
};

type Group = {
  group: string;
  id: string;
  skills: Skill[];
};
type Block = {
  id: string;
  block: string;
  groups: Group[];
};

type Scheme = Block[];
export function createFlowDataFromJSON(data: unknown) {
  const enchancedRawScheme = addIdForItems(data);

  const flowData: FlowDataScheme = {
    nodes: getNodes(enchancedRawScheme),
    edges: getEdges(enchancedRawScheme),
  };

  return { flowData, enchancedRawScheme };
}
