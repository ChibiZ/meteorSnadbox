import { Badge } from '@chakra-ui/react';
import React from 'react';

import './styles.module.css';
import { useTrackProgress } from './useTrackProgress';
import { useRoadMapContext } from '/imports/ui/pages/roadmap/RoadMapContext';

export const TrackProgress = React.memo(() => {
  const { roadmap } = useRoadMapContext();
  const { percent, total, doneTaskCount, inProgressTaskCount } =
    useTrackProgress(roadmap?.rawScheme);

  return (
    <div className="trackProgress">
      <Badge colorScheme="blue" ml="2">
        {percent}% Done
      </Badge>
      <Badge colorScheme="green" ml="2">
        {doneTaskCount} completed
      </Badge>
      <Badge colorScheme="yellow" ml="2">
        {inProgressTaskCount} in progress
      </Badge>

      <Badge colorScheme="black.800" ml="2">
        · {total} Total Track Progress
      </Badge>
    </div>
  );
});
