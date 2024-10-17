import { Edge, FlowDataScheme, Node } from './types';
import {
  getWidthNode,
  NodesTree,
  transformTextToTree,
  TreeNode,
  TreeNodeChild,
} from './utils';
import { SUB_TOPIC_EDGE_STYLES, TOPIC_EDGE_STYLES } from './consts';

const getNodeWidth = (node: TreeNode) => {
  const NODE_PADDING = 32;
  let width = getWidthNode(node.title) + NODE_PADDING;

  return width;
};
const generateTopicNode = ({
  width,
  topic,
  x,
  y,
  kind,
}: {
  width: Node['width'];
  x: Node['position']['x'];
  y: Node['position']['y'];
  kind: Node['data']['kind'];
  topic: { id: string; title: string };
}): Node => {
  return {
    id: topic.id,
    type: 'customNode',
    width,

    data: {
      label: topic.title,
      kind,
    },

    position: {
      x,
      y,
    },
  };
};

export const getNodes = (tree: NodesTree) => {
  const X_OFFSET_BETWEEN_NODES = 90;
  const Y_OFFSET_BETWEEN_ROOT_NODES = 70;
  const Y_OFFSET_BETWEEN_CHILD_NODES = 80;
  const PADDING_AFTER_LAST_CHILD_GROUP = 10;
  const nodes: Node[] = [];
  let offsetY = 0;

  Object.keys(tree).forEach((id, index) => {
    const topic = tree[id];
    const width = getNodeWidth(topic);

    nodes.push(
      generateTopicNode({
        topic,
        y: offsetY,
        x: -(width / 2),
        kind: 'topic',
        width,
      }),
    );

    if (topic?.children) {
      const middle = Math.round(topic?.children.length / 2);

      const leftNodes = topic?.children.slice(0, middle);
      const rightNodes = topic?.children.slice(middle);

      const generateChildrenNodes = (
        childNodes: TreeNodeChild[],
        type: 'left' | 'right',
      ) => {
        let childYOffset = 0;

        childNodes.forEach((childNode, i) => {
          const childWidth = getNodeWidth(childNode);

          const leftCalc = () =>
            -(width / 2) - childWidth - X_OFFSET_BETWEEN_NODES;
          const rightCalc = () => width / 2 + X_OFFSET_BETWEEN_NODES;

          const x = type === 'left' ? leftCalc() : rightCalc();

          nodes.push(
            generateTopicNode({
              topic: childNode,
              y: childYOffset + offsetY,
              x,
              kind: 'subtopic',
              width: childWidth,
            }),
          );
          childYOffset += Y_OFFSET_BETWEEN_CHILD_NODES;
        });

        return childYOffset;
      };

      const y1 = generateChildrenNodes(leftNodes, 'left');
      const y2 = generateChildrenNodes(rightNodes, 'right');

      const newOff = Math.max(y1, y2);
      offsetY += newOff + PADDING_AFTER_LAST_CHILD_GROUP;
    } else {
      offsetY += Y_OFFSET_BETWEEN_ROOT_NODES;
    }
  });

  return nodes;
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

export const getEdges = (tree: NodesTree) => {
  const edges: Edge[] = [];

  let prevRootNode = null;

  Object.keys(tree).forEach((id) => {
    const node = tree[id];
    if (!prevRootNode) {
      prevRootNode = node;
      return;
    }

    edges.push(
      createEdge({
        id: node.id + prevRootNode.id,
        source: prevRootNode.id,
        target: node.id,
        sourceHandle: 'x2',
        targetHandle: 'w1',
        kind: node.kind,
      }),
    );

    if (node.children) {
      const middle = Math.round(node?.children.length / 2);

      const leftNodes = node?.children.slice(0, middle);
      const rightNodes = node?.children.slice(middle);

      leftNodes.forEach((childNode) => {
        edges.push(
          createEdge({
            id: node.id + childNode.id,
            source: node.id,
            target: childNode.id,
            sourceHandle: 'y2',
            targetHandle: 'z1',
            kind: childNode.kind,
          }),
        );
      });

      rightNodes.forEach((childNode) => {
        edges.push(
          createEdge({
            id: node.id + childNode.id,
            source: node.id,
            target: childNode.id,
            sourceHandle: 'z2',
            targetHandle: 'y1',
            kind: childNode.kind,
          }),
        );
      });
    }

    prevRootNode = node;
  });

  return edges;
};

export const createFlowDataFromText = (value): FlowDataScheme => {
  const tree = transformTextToTree(value);
  const flowData: FlowDataScheme = {
    nodes: getNodes(tree),
    edges: getEdges(tree),
  };

  console.log('flowData', flowData);
  return flowData;
};
