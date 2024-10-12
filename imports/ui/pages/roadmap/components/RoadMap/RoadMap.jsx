import { useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import {
  ReactFlow,
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
import { createFlowDataFromText } from '/imports/ui/pages/roadmap/tree/createTreeFromTxt';

import { useRoadmapApi } from '../../useRoadmapApi';
import { SUB_TOPIC_EDGE_STYLES } from '../../tree/consts';
import { useRoadMapContext } from '../../RoadMapContext';
import { prepareRoadmapToSave, setStatusForNodes } from './utils';

const DEFAULT_VIEWPORT = { x: window.innerWidth / 2, y: 50, zoom: 0.9 };

const nodeTypes = {
  selectorNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};
export const RoadMap = React.memo(() => {
  const { roadmap, userProgress } = useRoadMapContext();
  const { update, isLoading, create } = useRoadmapApi();

  const [rfInstance, setRfInstance] = React.useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    setStatusForNodes(roadmap.nodes, userProgress),
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    ...(roadmap?.edges ?? []),
  ]);
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [hasChanges, setChanges] = React.useState(false);

  const NODES = React.useMemo(() => {
    return setStatusForNodes(nodes, userProgress);
  }, [nodes, userProgress]);

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
    if (!nodes.length) return;

    const flow = rfInstance.toObject();
    const prepared = prepareRoadmapToSave(flow);

    const isNewRoadMap = Boolean(roadmap?._id == null);

    if (isNewRoadMap) {
      await create(prepared);
      return;
    }

    await update(roadmap._id, prepared);

    setChanges(false);
  };

  const onNodesChangeHandler = React.useCallback(
    (changes) => {
      onNodesChange(changes);

      const hasChangedAnyNode = changes.some(({ type }) => type === 'position');

      if (hasChangedAnyNode) {
        setChanges(true);
      }
    },
    [onNodesChange],
  );

  const onCloseNodePage = React.useCallback(() => setSelectedNode(null), []);

  return (
    <>
      <ReactFlow
        onInit={setRfInstance}
        nodes={NODES}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={onNodeClick}
        defaultViewport={DEFAULT_VIEWPORT}
      >
        <Controls />
      </ReactFlow>

      {selectedNode !== null && (
        <InfoNodePage
          isOpen={true}
          onClose={onCloseNodePage}
          node={selectedNode}
        />
      )}

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
