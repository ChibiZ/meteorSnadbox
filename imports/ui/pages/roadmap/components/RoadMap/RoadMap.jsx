import { CheckIcon, InfoIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import {
  addEdge,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useCallback } from 'react';
import { ImportRoadmap } from '../ImportRoadmap';
import { InfoNodePage } from '../InfoNodePage';

import { Link } from 'react-router-dom';
import { TrackProgress } from './components/TrackProgress';
import { DEFAULT_VIEWPORT, edgeTypes, nodeTypes } from './consts';
import { isNodeTopic, prepareRoadmapToSave, setStatusForNodes } from './utils';
import { Loading } from '/imports/ui/components/loading';
import { useRoadMapContext } from '/imports/ui/pages/roadmap/RoadMapContext';
import { SUB_TOPIC_EDGE_STYLES } from '/imports/ui/pages/roadmap/tree/consts';
import { createFlowDataFromJSON } from '/imports/ui/pages/roadmap/tree/createFlowDataFromJSON';
import { useRoadmapApi } from '/imports/ui/pages/roadmap/useRoadmapApi';
import { routes } from '/imports/ui/routes/routes';

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
  console.log(nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    ...(roadmap?.flowData?.edges ?? []),
  ]);

  const NODES = React.useMemo(() => {
    return setStatusForNodes(nodes, roadmap?.rawScheme);
  }, [nodes, roadmap?.rawScheme]);

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
    await update(roadmap.id, prepared);

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
          setNodes={setNodes}
        />
      )}

      <div className="roadmap-toolbar">
        {isEditable && <ImportRoadmap onCreate={onCreateRoadmap} />}

        {isEditable && hasChanges && (
          <Button
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
            size="sm"
            as={Link}
            to={routes.statistics}
            leftIcon={<InfoIcon />}
          >
            Админка
          </Button>
        )}
      </div>

      <TrackProgress />

      {isUpdatingRoadmap && (
        <div className="overlay-loader-container">
          <Loading />
        </div>
      )}
    </>
  );
});
