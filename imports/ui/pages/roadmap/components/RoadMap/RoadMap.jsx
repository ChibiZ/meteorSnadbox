import { CheckIcon, InfoIcon, DownloadIcon } from '@chakra-ui/icons';
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
import { downloadObjectAsJson } from '/imports/ui/shared/downloadObjectAsJson';
import { Link } from 'react-router-dom';
import { TrackProgress } from './components/TrackProgress';
import { DEFAULT_VIEWPORT, edgeTypes, nodeTypes } from './consts';
import { isSkillNode, prepareRoadmapToSave, setStatusForNodes } from './utils';
import { Loading } from '/imports/ui/components/loading';
import { useRoadMapContext } from '/imports/ui/pages/roadmap/RoadMapContext';
import { SUB_TOPIC_EDGE_STYLES } from '/imports/ui/pages/roadmap/tree/consts';
import { createFlowDataFromJSON } from '/imports/ui/pages/roadmap/tree/createFlowDataFromJSON';
import { useRoadmapApi } from '/imports/ui/pages/roadmap/useRoadmapApi';
import { routes } from '/imports/ui/routes/routes';
import { FlowUtils } from './FlowUtils';
import { LevelFilterList } from './components/LevelFilterList';
import { useLevelFilter } from './components/LevelFilterList/useLevelFilter';
import debounce from 'lodash.debounce';
import { useStorageSettings } from './useStorageSettings';

export const RoadMap = React.memo(({ isReadOnly }) => {
  const {
    roadmap,
    getRoadmap,
    isLoading: isUpdatingRoadmap,
  } = useRoadMapContext();
  const { update, isLoading, create } = useRoadmapApi();
  const { data: savedRoadmapSettings, onSave } = useStorageSettings();
  const [rfInstance, setRfInstance] = React.useState(null);
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [hasChanges, setChanges] = React.useState(false);
  const [isReady, setReady] = React.useState(false);

  const initializedNodes = React.useMemo(
    () => setStatusForNodes(roadmap?.flowData.nodes, roadmap?.rawScheme),
    [roadmap],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initializedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    ...(roadmap?.flowData?.edges ?? []),
  ]);

  const { levelFilter, onChangeLevelFilter } = useLevelFilter();
  const isEditable = !isReadOnly;

  React.useEffect(() => {
    setNodes((prevNodes) => setStatusForNodes(prevNodes, roadmap?.rawScheme));
  }, [roadmap]);

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

  const onNodeClick = useCallback(
    (event, node) => {
      const direction = event.target?.closest('button')?.dataset.direction;
      const clickedOnButton = ['up', 'down', 'left', 'right'].includes(
        direction,
      );

      if (clickedOnButton) {
        const flow = rfInstance.toObject();

        const updatedFlow = FlowUtils.moveConnectedNodes({
          direction,
          nodes,
          edges,
          flow,
          node,
        });

        setNodes([...updatedFlow.nodes]);
        setEdges([...updatedFlow.edges]);

        setChanges(true);
        return;
      }

      if (isSkillNode(node)) {
        setSelectedNode(node);
      }
    },
    [rfInstance, nodes, edges],
  );

  const onCreateRoadmapFromFile = async (data) => {
    const { flowData, enchancedRawScheme } = createFlowDataFromJSON(data);

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

  const onChangeLevelFilterHandler = (levels) => {
    onChangeLevelFilter(levels);

    const filteredNodes = FlowUtils.filterNodesBySkillLevel({
      nodes,
      edges,
      levels,
    });

    setNodes(filteredNodes);
  };

  const onInit = React.useCallback((instance) => {
    setRfInstance(instance);
    setReady(true);
  }, []);

  const exportToJSON = () => {
    downloadObjectAsJson(
      roadmap,
      `roadmap_${new Date().toJSON().slice(0, 10)}`,
    );
  };

  const onViewportChange = React.useCallback(
    debounce((viewport) => {
      onSave({ defaultViewport: viewport });
    }, 500),
    [onSave],
  );

  return (
    <>
      <ReactFlow
        onInit={onInit}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={onNodeClick}
        defaultViewport={savedRoadmapSettings.defaultViewport}
        edgesFocusable={isEditable}
        nodesDraggable={isEditable}
        nodesConnectable={isEditable}
        nodesFocusable={isEditable}
        elementsSelectable={isEditable}
        onViewportChange={onViewportChange}
      >
        <Controls showInteractive={isEditable} />
      </ReactFlow>
      {selectedNode !== null && (
        <InfoNodePage
          isOpen={true}
          onClose={onCloseNodePage}
          node={selectedNode}
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
        />
      )}
      <div className="roadmap-toolbar">
        {isEditable && <ImportRoadmap onCreate={onCreateRoadmapFromFile} />}

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

        {isEditable && (
          <Button size="sm" onClick={exportToJSON} leftIcon={<DownloadIcon />}>
            Export roadmap to JSON
          </Button>
        )}
      </div>
      <TrackProgress />
      {isUpdatingRoadmap && (
        <div className="overlay-loader-container">
          <Loading />
        </div>
      )}
      <LevelFilterList
        onChange={onChangeLevelFilterHandler}
        value={levelFilter}
      />
      {!isReady && <Loading isAbsolute={true} />}
    </>
  );
});
