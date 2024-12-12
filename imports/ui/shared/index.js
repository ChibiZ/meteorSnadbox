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

export const GRADES = [
  {
    id: '1',
    name: 'Младший разработчик',
  },
  {
    id: '2',
    name: 'Разработчик',
  },
  {
    id: '3',
    name: 'Старший разработчик',
  },
];

export const getGradeTitleById = (id) => {
  return GRADES.find((grade) => grade.id === id)?.name ?? null;
};
