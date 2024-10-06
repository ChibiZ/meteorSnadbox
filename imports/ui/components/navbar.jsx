import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Logout } from './logout';
import { Logo } from './Logo';
export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <a href="/" style={{ width: 70, marginRight: 20 }}>
          <Logo />
        </a>
        <Flex flex={{ base: 1 }} justify="start">
          <Text
            as="span"
            fontWeight="bold"
            fontFamily="heading"
            textAlign="left"
            color={'#000'}
          >
            Матрица компетенций
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Moon Icon' : 'Sun Icon'}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Logout />
        </Stack>
      </Flex>
    </header>
  );
}
