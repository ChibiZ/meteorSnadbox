import { getOutgoers } from '@xyflow/react';
import { createFlowDataFromJSON } from '../../tree/createFlowDataFromJSON';
import { groupByKey } from '../../../../shared/groupByKey';

export class FlowUtils {
  static moveConnectedNodes({ flow, direction, nodes, edges, node }) {
    const flowCopy = structuredClone(flow);
    const incomersNodes = getOutgoers(node, nodes, edges);
    const allIncomersNodes = incomersNodes.flatMap((incomer) =>
      getOutgoers(incomer, nodes, edges),
    );

    const allConnectedNodes = [...incomersNodes, ...allIncomersNodes, node];

    allConnectedNodes.forEach((node) => {
      const nodeFromFlow = flowCopy.nodes.find((n) => n.id === node.id);
      if (!nodeFromFlow) return;

      const kindOffset = {
        block: 300,
        group: 150,
        skill: 100,
      };
      if (['left', 'right'].includes(direction)) {
        const koeff = direction === 'left' ? -1 : 1;

        nodeFromFlow.position.x =
          nodeFromFlow.position.x + koeff * kindOffset[node.data.kind];
      }

      if (['up', 'down'].includes(direction)) {
        const koeff = direction === 'up' ? -1 : 1;

        nodeFromFlow.position.y =
          nodeFromFlow.position.y + koeff * kindOffset[node.data.kind];
      }
    });

    return flowCopy;
  }

  static mergeChangeFromJSON({ data, flow }) {
    const flowNodesAsMap = groupByKey(flow.nodes);

    const { flowData, rawScheme } = createFlowDataFromJSON(data);

    flowData.nodes.forEach((node) => {
      if (flowNodesAsMap[node.id]?.position) {
        node.position = { ...flowNodesAsMap[node.id].position };
      }
    });

    return {
      flowData,
      rawScheme,
    };
  }

  static filterNodesBySkillLevel({ nodes, edges, levels }) {
    const hiddenNodes = new Map();

    const filteredNodes = nodes.map((node) => {
      if (node.data.kind === 'group') {
        return {
          ...node,
          hidden: !getOutgoers(node, nodes, edges).some(
            (node) => !hiddenNodes.get(node.id),
          ),
        };
      }
      if (node.data.kind === 'skill') {
        const showSkill = levels.includes(node.data.level);
        hiddenNodes.set(node.id, !showSkill);

        return {
          ...node,
          hidden: !levels.includes(node.data.level),
        };
      }

      return node;
    });

    return filteredNodes;
  }
}
