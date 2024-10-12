import { Meteor } from 'meteor/meteor';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export const useAuth = () => {
  const toast = useToast();
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const registerUser = async ({ username, password }) => {
    setLoading(true);
    Accounts.createUser(
      {
        username: username,
        password: password,
      },
      (error) => {
        if (error) {
          alert('Username already exists');

          toast({
            title: 'Username already exists',
            description: JSON.stringify(error),
            status: 'error',
            duration: 9000,
            isClosable: true,
          });

          console.log(error);
          setLoading(false);

          return;
        }
        Meteor.loginWithPassword(username, password).then(() => {
          setLoading(false);
        });
        navigate('/');
      },
    );
  };

  const loginUser = ({ username, password }) => {
    setLoading(true);

    Meteor.loginWithPassword(username, password, (error) => {
      setLoading(false);

      if (error) {
        toast({
          title: 'Ошибка логина',
          description: JSON.stringify(error),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });

        return;
      }
      navigate('/');
    });
  };

  const logout = () => {
    Meteor.logout(() => {
      navigate('/login');
    });
  };

  return { loginUser, registerUser, isLoading, logout };
};
