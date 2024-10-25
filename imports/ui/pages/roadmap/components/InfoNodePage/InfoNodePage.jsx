import React from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  ButtonGroup,
  Button,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { StatusIndicator } from './StatusIndicator';
import './styles.css';
import { useUserProgressApi } from '/imports/ui/pages/roadmap/useUserProgressApi';
import { useRoadMapContext } from '/imports/ui/pages/roadmap//RoadMapContext';
import { TaskStatus } from '/imports/ui/shared';
import { useContent } from './useContent';
import { Loading } from '../../../../components/loading';

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

export const InfoNodePage = React.memo(({ isOpen, onClose, node }) => {
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
                <Text>{data?.text ?? 'Пока ничего нет...'}</Text>
              </>
            )}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});
