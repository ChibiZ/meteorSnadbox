import { NodeKind } from './types';

export type TreeNodeChild = { id: string; title: string; kind: NodeKind };

export type TreeNode = {
  id: string;
  title: string;
  kind: NodeKind;
  children?: TreeNodeChild[];
};
export type NodesTree = Record<string, TreeNode>;

export const getWidthNode = (text: string, font?: string) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const ff = getComputedStyle(document.body).fontFamily;
  const fw = getComputedStyle(document.body).fontWeight;

  context.font = font || `${fw} 21px ${ff}`;
  return context.measureText(text).width;
};
