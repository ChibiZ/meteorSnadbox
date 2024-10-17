import { CustomNode } from './components/CustomNode';
import { CustomEdge } from './components/CustomEdge';

export const DEFAULT_VIEWPORT = { x: window.innerWidth / 2, y: 50, zoom: 0.9 };

export const nodeTypes = {
  customNode: CustomNode,
};

export const edgeTypes = {
  customEdge: CustomEdge,
};
