import React from 'react';

import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const edges = [{ id: '1-2', source: '1', target: '2' }];

const nodes = [
  {
    id: '1', // required
    position: { x: 0, y: 0 }, // required
    data: { label: 'Hello', onNodeClick: () => {console.log('1 ev')} }, // required
  },
  {
      id: '2',
      position: { x: 100, y: 100 },
      data: { label: 'World' },
    },
];

export const Flow = () => {
  onNodeClick = (node) => {
    console.log(node);
  }
  return (
    <div style={{ height: '500px', width: '500px' }}>
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}