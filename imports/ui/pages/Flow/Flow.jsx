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
import { InfoNodePage } from './components/InfoNodePage';
import { ImportRoadmap } from './components/ImportRoadmap';
import { createFlowDataFromText } from './tree/createTreeFromTxt';
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

  const [isNodeInfoOpen, setNodeInfoOpen] = React.useState(false);
  const onNodeClick = useCallback((event, node) => {
    setNodeInfoOpen(true);
  }, []);

  const onCreateRoadmap = (value) => {
    const tree = createFlowDataFromText(value);

    setNodes([...tree.nodes]);
    setEdges([...tree.edges]);
  };
  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  return (
    <>
      <ReactFlow
        onLoad={onLoad}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView={true}
        onNodeClick={onNodeClick}
      >
        <MiniMap position="top-right" />
        <Controls />
        <Background />
      </ReactFlow>

      <InfoNodePage
        isOpen={isNodeInfoOpen}
        onClose={() => setNodeInfoOpen(false)}
      />

      <ImportRoadmap onCreate={onCreateRoadmap} />
    </>
  );
}

export default Flow;
