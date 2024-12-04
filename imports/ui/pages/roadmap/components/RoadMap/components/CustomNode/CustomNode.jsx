import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
export const CustomNode = memo(
  ({ data, isConnectable, draggable, ...props }) => {
    const style = draggable ? undefined : { opacity: 0 };

    return (
      <div
        className={`node ${data.kind} ${data.status ?? ''}`}
        style={data.style}
      >
        {draggable && (
          <>
            <IconButton
              icon={<ArrowUpIcon data-direction="up" />}
              className="node-arrow node-arrow-up"
              data-direction="up"
            />
            <IconButton
              icon={<ArrowDownIcon data-direction="down" />}
              className="node-arrow node-arrow-down"
              data-direction="down"
            />
            <IconButton
              icon={<ArrowUpIcon data-direction="left" />}
              className="node-arrow node-arrow-left"
              data-direction="left"
            />
            <IconButton
              icon={<ArrowDownIcon data-direction="right" />}
              className="node-arrow node-arrow-right"
              data-direction="right"
            />
          </>
        )}

        <div>{data.label}</div>

        <Handle
          type="target"
          position={Position.Left}
          id="y1"
          isConnectable={isConnectable}
          style={style}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="y2"
          isConnectable={isConnectable}
          style={style}
        />
        <Handle
          type="target"
          position={Position.Bottom}
          id="x1"
          isConnectable={isConnectable}
          style={style}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="x2"
          isConnectable={isConnectable}
          style={style}
        />
        <Handle
          type="target"
          position={Position.Right}
          id="z1"
          isConnectable={isConnectable}
          style={style}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="z2"
          isConnectable={isConnectable}
          style={style}
        />
        <Handle
          type="target"
          position={Position.Top}
          id="w1"
          isConnectable={isConnectable}
          style={style}
        />
        <Handle
          type="source"
          position={Position.Top}
          id="w2"
          isConnectable={isConnectable}
          style={style}
        />
      </div>
    );
  },
);
