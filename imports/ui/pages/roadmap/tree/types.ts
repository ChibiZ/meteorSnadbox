import { CSSProperties } from 'react';

export type NodeKind = 'block' | 'group' | 'skill';

export type Node = {
  id: string;
  type: 'customNode';
  width: number;

  data: {
    label: string;
    kind: NodeKind;
    style?: CSSProperties;
  };

  position: {
    x: number;
    y: number;
  };
};

export type HandlerKeyNode = 'w1' | 'w2' | 'x1' | 'x2' | 'z1' | 'z2';
export type Edge = {
  id: string;
  source: string;
  target: string;
  targetHandle: HandlerKeyNode;
  sourceHandle: HandlerKeyNode;
};

export type FlowDataScheme = {
  nodes: Node[];
  edges: Edge[];
};
