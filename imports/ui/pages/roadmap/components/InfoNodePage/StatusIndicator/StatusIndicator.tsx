import React from 'react';

import './styles.css';

interface Props {
  status: string;
}

export const StatusIndicator = ({ status }: React.PropsWithChildren<Props>) => {
  return <span className={'status-indicator' + ' ' + status} />;
};
