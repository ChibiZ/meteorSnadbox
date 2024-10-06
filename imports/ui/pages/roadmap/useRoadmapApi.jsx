import React from 'react';
import { useToast } from '@chakra-ui/react';

export function useRoadmapApi() {
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();

  const update = async (id, data) => {
    try {
      setLoading(true);
      await Meteor.callAsync('roadmap.update', { _id: id, data });
      toast({
        title: 'Данные сохранены.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Ошибка сохранения данных',
        status: JSON.stringify(e),
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTask = (id, status) => {};

  return {
    update,
    isLoading,
    updateTask,
  };
}
