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

export const LEVELS = [
  {
    id: 1,
    name: 'Base',
  },
  {
    id: 2,
    name: 'Good',
  },
  {
    id: 3,
    name: 'Strong',
  },
  {
    id: 4,
    name: 'Expert',
  },
];
