import React from 'react';

import './styles.css';

interface Props {
  status: string;
}

export const TaskStatus = {
  Done: 'Done',
  Skip: 'Skip',
  InProgress: 'InProgress',
  Pending: 'Pending',
};

export const StatusIndicator = ({ status }: React.PropsWithChildren<Props>) => {
  return <span className={'status-indicator' + ' ' + status} />;
};
