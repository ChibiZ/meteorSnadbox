import { useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
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
import { CustomNode } from './components/CustomNode';
import { CustomEdge } from './components/CustomEdge';
import { InfoNodePage } from '../InfoNodePage';
import { ImportRoadmap } from '../ImportRoadmap';
import { createFlowDataFromText } from '../../tree/createTreeFromTxt';
import { BrowserView } from 'react-device-detect';

import { useRoadmapApi } from '../../useRoadmapApi';
import { SUB_TOPIC_EDGE_STYLES } from '../../tree/consts';

const nodeTypes = {
  selectorNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export const RoadMap = React.memo(({ data }) => {
  const [rfInstance, setRfInstance] = React.useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([
    ...(data?.nodes ?? []),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    ...(data?.edges ?? []),
  ]);
  const [hasChanges, setChanges] = React.useState(false);
  const [selectedNode, setSelectedNode] = React.useState(null);
  const { update, isLoading, create } = useRoadmapApi();

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        type: 'customEdge',
        style: SUB_TOPIC_EDGE_STYLES,
      };

      setEdges((eds) => addEdge(edge, eds));
      setChanges(true);
    },
    [setEdges],
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onCreateRoadmap = (value) => {
    const tree = createFlowDataFromText(value);

    setNodes([...tree.nodes]);
    setEdges([...tree.edges]);
    setChanges(true);
  };

  const onSaveChanges = async () => {
    if (nodes.length && edges.length) {
      const flow = rfInstance.toObject();

      if (data?._id) {
        await update(data._id, flow);
      } else {
        await create(flow);
      }

      setChanges(false);
    }
  };

  const onNodesChangeHandler = React.useCallback(
    (changes) => {
      onNodesChange(changes);

      if (changes.some(({ type }) => type === 'position')) {
        setChanges(true);
      }
    },
    [onNodesChange],
  );

  return (
    <>
      <ReactFlow
        onInit={setRfInstance}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView={true}
        onNodeClick={onNodeClick}
      >
        <BrowserView>
          <MiniMap position="top-right" />
        </BrowserView>

        <Controls />
        <Background />
      </ReactFlow>

      <InfoNodePage
        isOpen={selectedNode !== null}
        onClose={() => setSelectedNode(null)}
        node={selectedNode}
      />

      <ImportRoadmap onCreate={onCreateRoadmap} />
      {hasChanges && (
        <Button
          style={{ position: 'absolute', top: 124 }}
          leftIcon={<CheckIcon />}
          onClick={onSaveChanges}
          size="sm"
          isLoading={isLoading}
        >
          Сохранить изменения
        </Button>
      )}
    </>
  );
});
