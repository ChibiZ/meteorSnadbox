import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import React from 'react';
import '@xyflow/react/dist/style.css';
import { data } from './data';
import { CustomNode } from './CustomNode';
import { CustomEdge } from './CustomEdge';
import { prepareNodes } from './prepareData';
const getEdgeStyle = () => {
  return {
    style: {
      strokeDasharray: '0.8 8',
      strokeLinecap: 'round',
      strokeWidth: 3.5,
      stroke: '#2b78e4',
    },

    data: {
      edgeStyle: 'dashed',
    },
  };
};

const nodeTypes = {
  selectorNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    prepareNodes(data.nodes),
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        type: 'customEdge',
        ...getEdgeStyle(),
      };

      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}

export default Flow;
