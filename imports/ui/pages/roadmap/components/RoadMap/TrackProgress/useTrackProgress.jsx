import { TaskStatus } from '../../../../../shared';
import React from 'react';
const filterTasksByStatus = (userProgress, status) =>
  Object.values(userProgress ?? {}).filter((task) => task.status === status)
    ?.length ?? 0;

export function useTrackProgress(roadmap, userProgress) {
  const data = React.useMemo(() => {
    const total = roadmap?.nodes?.length ?? 0;

    const doneTaskCount = filterTasksByStatus(userProgress, TaskStatus.Done);

    const inProgressTaskCount = filterTasksByStatus(
      userProgress,
      TaskStatus.InProgress,
    );
    const skippedTasksCount = filterTasksByStatus(
      userProgress,
      TaskStatus.Skip,
    );

    const percent = Math.floor((doneTaskCount / total) * 100);
    return {
      total,
      doneTaskCount,
      inProgressTaskCount,
      percent,
      skippedTasksCount,
    };
  }, [userProgress, roadmap]);

  return data;
}
