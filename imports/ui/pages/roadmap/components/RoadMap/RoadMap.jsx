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

import { useRoadmapApi } from '/imports/ui/pages/roadmap/useRoadmapApi';
import { SUB_TOPIC_EDGE_STYLES } from '/imports/ui/pages/roadmap/tree/consts';
import { useRoadMapContext } from '/imports/ui/pages/roadmap/RoadMapContext';
import { isNodeTopic, prepareRoadmapToSave, setStatusForNodes } from './utils';
import { TrackProgress } from './components/TrackProgress';
import { DEFAULT_VIEWPORT, edgeTypes, nodeTypes } from './consts';
import { Link } from 'react-router-dom';
import { routes } from '/imports/ui/routes/routes';
import { createFlowDataFromJSON } from '/imports/ui/pages/roadmap/tree/createFlowDataFromJSON';
import { Loading } from '../../../../components/loading';

export const RoadMap = React.memo(({ isReadOnly }) => {
  const {
    roadmap,
    getRoadmap,
    isLoading: isUpdatingRoadmap,
  } = useRoadMapContext();
  const { update, isLoading, create } = useRoadmapApi();

  const [rfInstance, setRfInstance] = React.useState(null);
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [hasChanges, setChanges] = React.useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    setStatusForNodes(roadmap?.flowData.nodes, roadmap?.rawScheme),
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    ...(roadmap?.flowData?.edges ?? []),
  ]);

  const NODES = React.useMemo(() => {
    console.log('fin');
    return setStatusForNodes(nodes, roadmap?.rawScheme);
  }, [nodes, roadmap.rawScheme]);

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

  const onCreateRoadmap = async (rawScheme) => {
    const { flowData, enchancedRawScheme } = createFlowDataFromJSON(rawScheme);
    await create({ flowData, rawScheme: enchancedRawScheme });
    await getRoadmap();
    setNodes([...flowData.nodes]);
    setEdges([...flowData.edges]);
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
          style={{ position: 'absolute', top: 54 }}
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
          style={{ position: 'absolute', top: 10, left: 200 }}
          size="sm"
          as={Link}
          to={routes.statistics}
        >
          Админка
        </Button>
      )}

      <TrackProgress />

      {isUpdatingRoadmap && (
        <div className="overlay-loader-container">
          <Loading />
        </div>
      )}
    </>
  );
});
