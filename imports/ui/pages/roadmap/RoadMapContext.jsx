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

        const userProgress = await userProgressApi.getUserProgressByRoadMap({
          roadmapId: roadmaps[0]._id,
        });

        setData({
          userProgress,
          roadmap: roadmaps[0],
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
    const userProgress = await userProgressApi.getUserProgressByRoadMap({
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
