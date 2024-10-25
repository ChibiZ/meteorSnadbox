import React from 'react';
import { Loading } from '/imports/ui/components/loading';
import { roadMapApi, userProgressApi } from '/imports/ui/api';

export const RoadMapContext = React.createContext({});

export const RoadMapContextProvider = React.memo(({ children }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [roadmap, setRoadmap] = React.useState(null);

  async function getData() {
    try {
      setLoading(true);
      const roadmaps = await roadMapApi.getList();
      const lastCreatedRoadmap = roadmaps.at(-1);

      const roadmapData = await Meteor.callAsync(
        'roadmap.getSchemeWithProgress',
        {
          id: lastCreatedRoadmap._id,
        },
      );

      setRoadmap(roadmapData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <RoadMapContext.Provider
      value={{ roadmap, getRoadmap: getData, isLoading }}
    >
      {isLoading && !roadmap ? <Loading /> : children}
    </RoadMapContext.Provider>
  );
});

export function useRoadMapContext() {
  return React.useContext(RoadMapContext);
}
