import { Box, Flex, Spinner, Stack } from '@chakra-ui/react';
import React from 'react';

const absoluteStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  background: '#fff',
};

export function Loading({ isAbsolute }) {
  return (
    <Box
      maxW="100%"
      mx="auto"
      height="100%"
      width="100%"
      zIndex={111}
      style={isAbsolute ? absoluteStyle : undefined}
    >
      <Flex align="center" justify="center" height="100%" width="100%">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Spinner size="sm" width={50} height={50} thickness={4} />
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
}
