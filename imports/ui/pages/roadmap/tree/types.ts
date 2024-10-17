export type NodeKind = 'topic' | 'subtopic';

export type Node = {
  id: string;
  type: 'customNode';
  width: number;

  data: {
    label: string;
    kind: NodeKind;
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
