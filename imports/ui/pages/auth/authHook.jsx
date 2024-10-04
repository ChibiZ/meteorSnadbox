import { Meteor } from 'meteor/meteor';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const authHook = () => {
  const toast = useToast();

  const navigate = useNavigate();
  const registerUser = async ({ username, password }) => {
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
          return;
        }
        Meteor.loginWithPassword(username, password);
        navigate('/');
      },
    );
  };

  const loginUser = ({ username, password }) => {
    Meteor.loginWithPassword(username, password, (error) => {
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

  return { loginUser, registerUser };
};
