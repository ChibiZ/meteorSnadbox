import { useParams, useSearchParams } from 'react-router-dom';
import { roadMapApi, usersApi } from '/imports/ui/api';
import React from 'react';
import { useToast } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

import { getStat } from '../roadmap/components/RoadMap/utils';

export function useData() {
  const { id: userId } = useParams();
  const [searchParams] = useSearchParams();
  const toast = useToast();

  const roadmapId = searchParams.get('roadmapId');
  const [data, setData] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        if (!roadmapId) {
          throw new Error(`Необходимо передать значение roadmapId.`);
        }

        const user = await usersApi.getById(userId);

        const roadmap = await roadMapApi.getSchemeWithProgress({
          id: roadmapId,
          userId,
        });

        if (!roadmap) {
          setLoading(false);
          return;
        }

        const statistics = getStat(roadmap.rawScheme);

        setUserData({
          ...user,
          statistics,
        });
        setData(roadmap.rawScheme);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast({
          title: 'Ошибка',
          description: JSON.stringify(error.message),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
    getData();
  }, []);

  return { data, isLoading, userData };
}
