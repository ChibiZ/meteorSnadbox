import { useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import React from 'react';
import '@xyflow/react/dist/style.css';
import { InfoNodePage } from '../InfoNodePage';
import { ImportRoadmap } from '../ImportRoadmap';
import { createFlowDataFromText } from '/imports/ui/pages/roadmap/tree/createTreeFromTxt';

import { useRoadmapApi } from '../../useRoadmapApi';
import { SUB_TOPIC_EDGE_STYLES } from '../../tree/consts';
import { useRoadMapContext } from '../../RoadMapContext';
import { isNodeTopic, prepareRoadmapToSave, setStatusForNodes } from './utils';
import { TrackProgress } from './components/TrackProgress';
import { DEFAULT_VIEWPORT, edgeTypes, nodeTypes } from './consts';
import { Link } from 'react-router-dom';
import { routes } from '../../../../routes/routes';

export const RoadMap = React.memo(({ isReadOnly }) => {
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
    if (isNodeTopic(node)) return;

    setSelectedNode(node);
  }, []);

  const onCreateRoadmap = async (value) => {
    if (!nodes.length) return;
    const tree = createFlowDataFromText(value);
    await create(tree);

    setNodes([...tree.nodes]);
    setEdges([...tree.edges]);
  };

  const onSaveChanges = async () => {
    if (!nodes.length) return;

    const flow = rfInstance.toObject();
    const prepared = prepareRoadmapToSave(flow);

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

  const isEditable = !isReadOnly;
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
        edgesFocusable={isEditable}
        nodesDraggable={isEditable}
        nodesConnectable={isEditable}
        nodesFocusable={isEditable}
        elementsSelectable={isEditable}
      >
        <Controls showInteractive={isEditable} />
      </ReactFlow>

      {selectedNode !== null && (
        <InfoNodePage
          isOpen={true}
          onClose={onCloseNodePage}
          node={selectedNode}
        />
      )}

      {isEditable && <ImportRoadmap onCreate={onCreateRoadmap} />}

      {isEditable && hasChanges && (
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

      {isEditable && (
        <Button
          style={{ position: 'absolute', top: 80, left: 200 }}
          size="sm"
          as={Link}
          to={routes.statistics}
        >
          Админка
        </Button>
      )}

      <TrackProgress />
    </>
  );
});
