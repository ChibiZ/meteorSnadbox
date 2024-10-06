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
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { StatusIndicator, TaskStatus } from './StatusIndicator';
import './styles.css';
import { useRoadmapApi } from '../../useRoadmapApi';

export const InfoNodePage = ({ isOpen, onClose, node }) => {
  const { updateTask } = useRoadmapApi();

  const onSelectStatus = (status) => {
    updateTask();
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement={'right'}
      onClose={onClose}
      isFullHeight={true}
      size={'lg'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button>
              <StatusIndicator status={''} /> Статус
            </Button>

            <Menu>
              <MenuButton as={Button} rightIcon={<ArrowDownIcon />}>
                Обновить статус
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => onSelectStatus(TaskStatus.Done)}>
                  <StatusIndicator status={TaskStatus.Done} /> Done
                </MenuItem>
                <MenuItem>
                  <StatusIndicator
                    status={TaskStatus.InProgress}
                    onClick={() => onSelectStatus(TaskStatus.InProgress)}
                  />{' '}
                  In progress
                </MenuItem>
                <MenuItem>
                  <StatusIndicator
                    status={TaskStatus.Skip}
                    onClick={() => onSelectStatus(TaskStatus.Skip)}
                  />{' '}
                  Skip
                </MenuItem>
              </MenuList>
            </Menu>
          </ButtonGroup>

          <div className="task-info">
            <Heading>HTML</Heading>
            <Text>
              HTML (Hypertext Markup Language) is the standard markup language
              used to create web pages and web applications. It provides a
              structure for content on the World Wide Web, using a system of
              elements and attributes to define the layout and content of a
              document. HTML elements are represented by tags, which browsers
              interpret to render the visual and auditory elements of a web
              page. The language has evolved through several versions, with
              HTML5 being the current standard, introducing semantic elements,
              improved multimedia support, and enhanced form controls. HTML
              works in conjunction with CSS for styling and JavaScript for
              interactivity, forming the foundation of modern web development.
              Visit the following resources to learn more:
            </Text>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
