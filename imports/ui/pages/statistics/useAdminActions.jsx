import { usersApi } from '/imports/ui/api';
import { useToast } from '@chakra-ui/react';

export function useAdminActions(successfulCallback) {
  const toast = useToast();

  async function onRemove(id) {
    try {
      await usersApi.remove(id);

      successfulCallback();
      toast({
        title: 'Пользователь удален.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Ошибка удаления.',
        status: 'error',
        duration: 4000,
        description: e.message,
        isClosable: true,
      });
    }
  }
  async function onChangeRole({ id, value }) {
    try {
      await usersApi.update({ id, data: { role: value ? 'Admin' : 'Member' } });
      successfulCallback();
      toast({
        title: 'Данные сохранены.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Ошибка',
        status: 'error',
        duration: 4000,
        description: e.message,
        isClosable: true,
      });
    }
  }

  return { onChangeRole, onRemove };
}
