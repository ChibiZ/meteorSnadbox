import React from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';

export const InfoNodePage = ({ isOpen, onClose }) => {
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
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>22 </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
