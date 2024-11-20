import React from 'react';

import { ArrowDownIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Loading } from '../../../../components/loading';
import { AdminAIEditor } from '../AdminAIEditor';
import { StatusIndicator } from './StatusIndicator';
import './styles.css';
import { useContent } from './useContent';
import { usePermissions } from '/imports/ui/hooks/usePermissions';
import { useRoadMapContext } from '/imports/ui/pages/roadmap//RoadMapContext';
import { useUserProgressApi } from '/imports/ui/pages/roadmap/useUserProgressApi';
import { TaskStatus } from '/imports/ui/shared';

const TASK_STATUSES = [
  {
    title: 'Done',
    value: TaskStatus.Done,
  },
  {
    title: 'In Progress',
    value: TaskStatus.InProgress,
  },

  {
    title: 'Reset',
    value: TaskStatus.Reset,
  },
];

export const InfoNodePage = ({
  isOpen,
  onClose,
  node,
  setNodes,
  nodes,
  edges,
}) => {
  const { isAdmin } = usePermissions();
  const { updateTask, isLoading: isUpdatingStatusTask } = useUserProgressApi();
  const { roadmap, getRoadmap } = useRoadMapContext();
  const { data, isLoading: isLoadingContent } = useContent({ id: node.id });
  const currentStatus = roadmap.rawScheme?.skills?.[node.id]?.status;
  const onSelectStatus = async (status) => {
    if (currentStatus === status) return;

    await updateTask({
      status,
      roadmapId: roadmap.id,
      id: node.id,
    });
    getRoadmap();
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      isFullHeight={true}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody style={{ padding: '1.5rem' }}>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button>
              <StatusIndicator status={currentStatus} /> Статус
            </Button>

            <Menu>
              <MenuButton as={Button} rightIcon={<ArrowDownIcon />}>
                {isUpdatingStatusTask ? (
                  <Spinner size={'sm'} />
                ) : (
                  'Обновить статус'
                )}
              </MenuButton>
              <MenuList p={0} minW="0" w={'150px'}>
                {TASK_STATUSES.map(({ title, value }) => (
                  <MenuItem
                    key={value}
                    onClick={() => onSelectStatus(value)}
                    icon={<StatusIndicator status={value} />}
                    disabled={isUpdatingStatusTask}
                  >
                    {title}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </ButtonGroup>

          <div className="task-info">
            {isLoadingContent ? (
              <Loading />
            ) : (
              <>
                <Heading mb={2}>{data?.title ?? node.data.label}</Heading>
                {!node.data?.text && <Text>Пока ничего нет...</Text>}
                {/* {node.data?.text && <Text>{node.data.text}</Text>} */}
                {node.data?.text && (
                  <div dangerouslySetInnerHTML={{ __html: node.data.text }} />
                )}
              </>
            )}
            {isAdmin && (
              <AdminAIEditor
                text={node.data?.text}
                nodeId={node.id}
                nodeLabel={data?.title ?? node.data.label}
                setNodes={setNodes}
                nodes={nodes}
                edges={edges}
              />
            )}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
