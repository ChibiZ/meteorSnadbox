import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Avatar } from '@chakra-ui/react';

import { Logout } from '../logout';
import { Logo } from '../Logo';
import { Link } from 'react-router-dom';
import { getFullName } from '../../shared/formats';

export function Navbar() {
  const user = useTracker(() => Meteor.user());

  return (
    <header>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        borderBottom={1}
        px={3}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Link to="/" style={{ width: 70, marginRight: 20 }}>
          <Logo />
        </Link>
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
        <Stack justify="flex-end" alignItems={'center'} direction="row">
          {user && (
            <span>
              {getFullName(user)}{' '}
              <Avatar name={user.username} size={'xs'} bg="green.500" />
            </span>
          )}

          <Logout />
          {/*<Button*/}
          {/*  size={'sm'}*/}
          {/*  onClick={toggleColorMode}*/}
          {/*  aria-label={colorMode === 'light' ? 'Moon Icon' : 'Sun Icon'}*/}
          {/*>*/}
          {/*  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}*/}
          {/*</Button>*/}
        </Stack>
      </Flex>
    </header>
  );
}
