import React from 'react';
import { Loading } from '../../components/loading';
import { roadMapApi, userProgressApi } from '../../api';

export const RoadMapContext = React.createContext({});

export const RoadMapContextProvider = React.memo(({ children }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const roadmaps = await roadMapApi.getList();
        const lastCreatedRoadmap = roadmaps.at(-1);

        const userProgress =
          await userProgressApi.getCurrentUserProgressByRoadMap({
            roadmapId: lastCreatedRoadmap._id,
          });

        setData({
          userProgress,
          roadmap: lastCreatedRoadmap,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  const getUserProgress = React.useCallback(async () => {
    const userProgress = await userProgressApi.getCurrentUserProgressByRoadMap({
      roadmapId: data.roadmap._id,
    });

    setData((prev) => ({
      ...prev,
      userProgress,
    }));
  }, [data]);

  return (
    <RoadMapContext.Provider value={{ ...data, getUserProgress }}>
      {isLoading ? <Loading /> : children}
    </RoadMapContext.Provider>
  );
});

export function useRoadMapContext() {
  return React.useContext(RoadMapContext);
}
