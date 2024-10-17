import { useParams, useSearchParams } from 'react-router-dom';
import { roadMapApi, userProgressApi } from '../../api';
import {
  getTreeFromFlowObject,
  mergeTreeWithUserProgress,
  normalizeTreeData,
} from './components/TaskTree/utils';
import React from 'react';
import { useToast } from '@chakra-ui/react';
import { getStat } from '../roadmap/components/RoadMap/utils';

export function useData() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const toast = useToast();

  const roadmapId = searchParams.get('roadmapId');
  const [data, setData] = React.useState(null);
  const [userStat, setUserStat] = React.useState(null);

  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        if (!roadmapId) {
          throw new Error(`Необходимо передать значение roadmapId.`);
        }

        const roadMap = await roadMapApi.getById(roadmapId);
        if (!roadMap) {
          setLoading(false);
          return;
        }

        const userProgress = await userProgressApi.getUserProgressById({
          id,
          roadmapId,
        });

        const tree = getTreeFromFlowObject(roadMap.nodes, roadMap.edges);
        const normalizedTree = normalizeTreeData(tree, roadMap.nodes); // remove flow data
        const mergedTree = mergeTreeWithUserProgress(
          normalizedTree,
          userProgress,
        );

        const stat = getStat(roadMap.nodes, userProgress);

        setUserStat(stat);
        setData(mergedTree);

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

  return { data, isLoading, userStat };
}
