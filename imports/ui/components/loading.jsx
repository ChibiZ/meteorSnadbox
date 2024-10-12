import { Box, Flex, Spinner, Stack } from '@chakra-ui/react';
import React from 'react';

export function Loading() {
  return (
    <Box maxW="6xl" mx="auto" height="100%" width="100%">
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
