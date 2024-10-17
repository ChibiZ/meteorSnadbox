export const TaskStatus = {
  Done: 'Done',
  InProgress: 'InProgress',
  Reset: 'Reset',
};

export const Roles = {
  Member: 'Member',
  Admin: 'Admin',
};
export const filterTasksByStatus = (userProgress, status) =>
  Object.values(userProgress ?? {}).filter((task) => task.status === status)
    ?.length ?? 0;
