import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export const CustomNode = memo(({ data, isConnectable, ...props }) => {
  return (
    <div className={`node ${data.kind} ${data.status ?? ''}`}>
      <div>{data.label}</div>

      <Handle
        type="target"
        position={Position.Left}
        id="y1"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="y2"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="x1"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="x2"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="z1"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="z2"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="w1"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="w2"
        isConnectable={isConnectable}
      />
    </div>
  );
});
