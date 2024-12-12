import { Meteor } from 'meteor/meteor';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export const useAuth = () => {
  const toast = useToast();
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const registerUser = async ({ name, password, surname, grade, email }) => {
    setLoading(true);
    Accounts.createUser(
      {
        name,
        password,
        surname,
        grade,
        email,
      },
      (error) => {
        if (error) {
          toast({
            title: 'Пользователь уже существует',
            description: error.reason,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });

          console.log(error);
          setLoading(false);

          return;
        }
        Meteor.loginWithPassword(name, password).then(() => {
          setLoading(false);
        });
        navigate('/');
      },
    );
  };

  const loginUser = ({ email, password }) => {
    setLoading(true);

    Meteor.loginWithPassword({ email }, password, (error) => {
      setLoading(false);

      if (error) {
        toast({
          title: 'Ошибка логина',
          description: JSON.stringify(error),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        console.log(error);

        return;
      }
      navigate('/');
    });
  };

  const changePassword = ({ password, newPassword }) => {
    setLoading(true);

    Accounts.changePassword(password, newPassword, (error) => {
      setLoading(false);

      if (error) {
        toast({
          title: 'Ошибка смены пароля',
          description: JSON.stringify(error),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        console.log(error);

        return;
      }

      toast({
        title: 'Успешно',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    });
  };

  const logout = () => {
    Meteor.logout(() => {
      navigate('/login');
    });
  };

  return { loginUser, registerUser, isLoading, logout, changePassword };
};
