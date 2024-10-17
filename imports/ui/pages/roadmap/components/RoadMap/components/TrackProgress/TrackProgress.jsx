import React from 'react';
import { Badge } from '@chakra-ui/react';
import { useRoadMapContext } from '../../../../RoadMapContext';
import { useTrackProgress } from './useTrackProgress';
import './styles.module.css';

export const TrackProgress = React.memo(() => {
  const { roadmap, userProgress } = useRoadMapContext();

  const { percent, total, doneTaskCount, inProgressTaskCount } =
    useTrackProgress(roadmap, userProgress);

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
