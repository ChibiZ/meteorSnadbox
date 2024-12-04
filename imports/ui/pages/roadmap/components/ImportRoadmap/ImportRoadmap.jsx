import React from 'react';

import Dropzone from 'react-dropzone';

import { Button, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { parseJsonFile } from '/imports/ui/shared/parseJsonFile';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'rgb(56 161 105)',
  borderStyle: 'dashed',
  backgroundColor: 'rgba(250,250,250,0.51)',
  color: '#404040',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export const ImportRoadmap = React.memo(({ onCreate, onEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState();

  const onSaveRoadmap = () => {
    onCreate(value);
    onClose();
  };

  const onDrop = React.useCallback(async (acceptedFiles) => {
    const [file] = acceptedFiles;

    const body = await parseJsonFile(file);
    setValue(body);
  }, []);

  return (
    <div>
      <Button
        variant={'solid'}
        onClick={onOpen}
        leftIcon={<AddIcon />}
        size={'sm'}
        colorScheme="green"
      >
        Импорт из файла
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Roadmap from json</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Dropzone
              onDrop={(files) => onDrop(files)}
              accept={{
                'application/json': ['.json'], // you need to specify into this array the extensions you want to accept
              }}
            >
              {({
                getRootProps,
                getInputProps,
                isFocused,
                isDragAccept,
                isDragReject,
                acceptedFiles,
              }) => (
                <section>
                  <div
                    {...getRootProps({
                      style: {
                        ...baseStyle,
                        ...(isFocused ? focusedStyle : {}),
                        ...(isDragAccept ? acceptStyle : {}),
                        ...(isDragReject ? rejectStyle : {}),
                      },
                    })}
                  >
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or Browse</p>
                  </div>
                  {acceptedFiles?.[0]?.name}
                </section>
              )}
            </Dropzone>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              colorScheme={'green'}
              onClick={onSaveRoadmap}
              isDisabled={value == null}
              mx={2}
            >
              Создать новый
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
});
