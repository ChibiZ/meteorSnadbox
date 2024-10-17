import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
export const ErrorMessage = () => {
  return (
    <Box textAlign="center" py={30} px={6}>
      <WarningTwoIcon boxSize={'50px'} color={'orange'} />
      <Heading as="h1" size="xl" mt={6} mb={2}>
        Error!
      </Heading>
      <Text color={'gray.500'}>Something wrong...</Text>
    </Box>
  );
};
