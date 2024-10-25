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

  console.log(data);
  const onSelectStatus = async (status) => {
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
                <Heading mb={2}>{node.data.label}</Heading>
                <Text>
                  HTML (Hypertext Markup Language) is the standard markup
                  language used to create web pages and web applications. It
                  provides a structure for content on the World Wide Web, using
                  a system of elements and attributes to define the layout and
                  content of a document. HTML elements are represented by tags,
                  which browsers interpret to render the visual and auditory
                  elements of a web page. The language has evolved through
                  several versions, with HTML5 being the current standard,
                  introducing semantic elements, improved multimedia support,
                  and enhanced form controls. HTML works in conjunction with CSS
                  for styling and JavaScript for interactivity, forming the
                  foundation of modern web development. Visit the following
                  resources to learn more:
                </Text>
              </>
            )}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});
