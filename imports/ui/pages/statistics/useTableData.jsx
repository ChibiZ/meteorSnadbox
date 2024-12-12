import React from 'react';
import { roadMapApi, userProgressApi } from '/imports/ui/api';
import { filterTasksByStatus, TaskStatus } from '/imports/ui/shared';
import { getTasks } from '../roadmap/components/RoadMap/utils';

export function useTableData() {
  const [isLoading, setLoading] = React.useState(true);
  const [rowData, setRowData] = React.useState([]);

  async function getData() {
    try {
      setLoading(true);

      const roadmaps = await roadMapApi.getList();
      const lastCreatedRoadmap = roadmaps.at(-1);

      const users = await userProgressApi.getAllUsersProgressByRoadMap({
        roadmapId: lastCreatedRoadmap._id,
      });

      const userStat = users.map((user) => {
        const total = getTasks(lastCreatedRoadmap?.flowData.nodes ?? []).length;

        const doneTaskCount = filterTasksByStatus(
          user.progress,
          TaskStatus.Done,
        );

        const inProgressTaskCount = filterTasksByStatus(
          user.progress,
          TaskStatus.InProgress,
        );

        const percent = Math.floor((doneTaskCount / total) * 100);

        return {
          ...user,
          done: doneTaskCount,
          inProgress: inProgressTaskCount,
          percent: percent,
          total,

          roadmapId: lastCreatedRoadmap._id,
        };
      });

      setRowData(userStat);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return {
    rowData,
    getData,
    isLoading,
  };
}
