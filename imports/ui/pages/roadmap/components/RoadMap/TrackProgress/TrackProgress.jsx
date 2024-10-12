import React from 'react';
import { Badge } from '@chakra-ui/react';
import { useRoadMapContext } from '../../../RoadMapContext';
import { useTrackProgress } from './useTrackProgress';

export const TrackProgress = React.memo(() => {
  const { roadmap, userProgress } = useRoadMapContext();

  const {
    percent,
    total,
    doneTaskCount,
    inProgressTaskCount,
    skippedTasksCount,
  } = useTrackProgress(roadmap, userProgress);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        border: '1px solid #ccc',
        padding: 5,
        borderRadius: 5,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Badge colorScheme="blue" ml="2">
        {percent}% Done
      </Badge>
      <Badge colorScheme="green" ml="2">
        {doneTaskCount} completed
      </Badge>
      <Badge colorScheme="yellow" ml="2">
        {inProgressTaskCount} in progress
      </Badge>
      <Badge colorScheme="blackAlpha" ml="2">
        {skippedTasksCount} skipped
      </Badge>

      <Badge colorScheme="black.800" ml="2">
        · {total} Total Track Progress
      </Badge>
    </div>
  );
});
