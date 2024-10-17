import React from 'react';
import { BaseEdge, getBezierPath } from '@xyflow/react';

export const CustomEdge = React.memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
  }) => {
    const [edgePath] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    return (
      <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} id={id} />
      </>
    );
  },
);
