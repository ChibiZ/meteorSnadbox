import React from 'react';
import { useToast } from '@chakra-ui/react';
import { userProgressApi } from '/imports/ui/api';
import { TaskStatus } from '/imports/ui/shared';

export function useUserProgressApi() {
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();

  const updateTask = async ({ id, status, roadmapId }) => {
    try {
      setLoading(true);

      if (status === TaskStatus.Reset) {
        await userProgressApi.resetTask({ id, roadmapId });
      } else {
        await userProgressApi.updateTask({ id, status, roadmapId });
      }

      toast({
        title: 'Статус обновлен',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    } catch (e) {
      toast({
        title: 'Ошибка обновления статуса',
        status: 'error',
        description: e.message,
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    updateTask,
  };
}
