import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from '../../routes';
import { useTracker } from 'meteor/react-meteor-data';
import { authHook } from './authHook';

export function SignInPage() {
  const user = useTracker(() => Meteor.user());

  const [isSignup, setIsSignup] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser, registerUser } = authHook();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignup) {
      loginUser({ username, password });
    } else {
      registerUser({ username, password });
    }
  };

  const errors = {};
  const isSubmitting = false;

  if (user) {
    return <Navigate to={routes.root} />;
  }

  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading
            fontSize="4xl"
            bgGradient="linear(to-l, #675AAA,#4399E1)"
            bgClip="text"
          >
            Войти/Регистрация
          </Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
          style={{ minWidth: 400 }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.username}>
                <Input
                  id="username"
                  name="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <InputGroup size="md">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Скрыть' : 'Показать'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {!isSignup && (
                <>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg="blue.600"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      // isLoading={isSubmitting}
                    >
                      Регистрация
                    </Button>
                  </Stack>
                  <Stack spacing={10}>
                    <Button onClick={() => setIsSignup(true)}>
                      У меня есть аккаунт
                    </Button>
                  </Stack>
                </>
              )}

              {isSignup && (
                <>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg="green.600"
                      color="white"
                      _hover={{
                        bg: 'green.500',
                      }}
                      isLoading={isSubmitting}
                    >
                      Войти
                    </Button>
                  </Stack>
                  <Stack spacing={10}>
                    <Button onClick={() => setIsSignup(false)}>
                      Создать новый аккаунт
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
