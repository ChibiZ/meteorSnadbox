import { Box } from '@chakra-ui/react';
import React from 'react';
import { Navbar } from './navbar';

export function Layout({ loggedOnly = true, children }) {
  return (
    <>
      <Navbar />
      <Box as={'main'}>{children}</Box>
    </>
  );
}
