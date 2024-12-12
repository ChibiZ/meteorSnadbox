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
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { routes } from '/imports/ui/routes/routes';
import { useTracker } from 'meteor/react-meteor-data';
import { useAuth } from './useAuth';
import { useForm } from './useForm';

export function RecoverPassword() {
  const user = useTracker(() => Meteor.user());

  const [showPassword, setShowPassword] = React.useState(false);

  const { isLoading, changePassword } = useAuth();

  const { formData, handleInputChange } = useForm({
    password: '',
    newPassword: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { newPassword, password } = formData;

    changePassword({ newPassword, password });
  };

  if (!user) {
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
            Восстановить
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
              <FormControl>
                <InputGroup size="md">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    onChange={handleInputChange}
                    placeholder="Старый пароль"
                  />
                  <InputRightElement width="5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      mr={2}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Скрыть' : 'Показать'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup size="md">
                  <Input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    required
                    onChange={handleInputChange}
                    placeholder="Новый пароль"
                  />
                  <InputRightElement width="5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      mr={2}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Скрыть' : 'Показать'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg="green.600"
                  color="white"
                  _hover={{
                    bg: 'green.500',
                  }}
                  isLoading={isLoading}
                >
                  Сохранить
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
