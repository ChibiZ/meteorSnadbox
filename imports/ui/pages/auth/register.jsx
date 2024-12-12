import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { routes } from '/imports/ui/routes/routes';
import { useTracker } from 'meteor/react-meteor-data';
import { useAuth } from './useAuth';
import { Select } from '@chakra-ui/icons';
import { GRADES } from '../../shared';
import { useForm } from './useForm';

export function RegisterPage() {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const { formData, handleInputChange, errors, isValid } = useForm({
    password: '',
    repeatPassword: '',
    name: '',
    surname: '',
    email: '',
    grade: '',
  });

  const { registerUser, isLoading } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    const { name, password, surname, grade, email } = formData;

    registerUser({ name, password, surname, grade, email });
  };

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
            Регистрация
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
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Имя"
                />
              </FormControl>

              <FormControl>
                <Input
                  id="surname"
                  name="surname"
                  required
                  onChange={handleInputChange}
                  placeholder="Фамилия"
                  value={formData.surname}
                />
              </FormControl>

              <FormControl>
                <Input
                  id="email"
                  name="email"
                  required
                  type="email"
                  onChange={handleInputChange}
                  placeholder="Почта"
                  value={formData.email}
                />
              </FormControl>

              <FormControl>
                <Select
                  required={true}
                  name="grade"
                  placeholder="Грейд"
                  onChange={handleInputChange}
                  value={formData.grade}
                >
                  {GRADES.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputGroup size="md">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    onChange={handleInputChange}
                    placeholder="Пароль"
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

              <FormControl isInvalid={errors?.repeatPassword}>
                <InputGroup size="md">
                  <Input
                    id="repeatPassword"
                    type={showPassword ? 'text' : 'password'}
                    name="repeatPassword"
                    required
                    onChange={handleInputChange}
                    placeholder="Повторите пароль"
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

                <FormErrorMessage>Пароли не совпадают</FormErrorMessage>
              </FormControl>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg="blue.600"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={isLoading}
                >
                  Регистрация
                </Button>
              </Stack>
              <Stack spacing={10}>
                <Button onClick={() => navigate(routes.login)}>
                  У меня есть аккаунт
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
