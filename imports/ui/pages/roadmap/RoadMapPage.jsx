import { RoadmapsCollection } from '/imports/api/roadmap/RoadmapCollection';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import React from 'react';

import { Loading } from '../../components/loading';
import { RoadMap } from './components/RoadMap';

export const RoadMapPage = () => {
  const isLoading = useSubscribe('roadmaps');
  const roadmap = useTracker(() => RoadmapsCollection.find({}).fetch());

  console.log(roadmap);
  if (isLoading()) {
    return <Loading />;
  }

  return <RoadMap data={roadmap[0]} />;
};
