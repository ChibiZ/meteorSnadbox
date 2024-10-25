import React from 'react';
import { useToast } from '@chakra-ui/react';
import { roadMapApi } from '/imports/ui/api';

export function useRoadmapApi() {
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();

  const update = async (id, data) => {
    try {
      setLoading(true);
      await roadMapApi.update({ id, data });
      toast({
        title: 'Данные сохранены.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: 'Ошибка сохранения данных',
        status: 'error',
        description: e.message,
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const create = async ({ flowData, rawScheme }) => {
    try {
      setLoading(true);
      await roadMapApi.create({ flowData, rawScheme });

      toast({
        title: 'Roadmap создан',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Ошибка сохранения данных',
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
    update,
    isLoading,
    create,
  };
}
