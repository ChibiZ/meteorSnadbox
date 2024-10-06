import { v7 } from 'uuid';
import { NodeKind } from '../types';

export type TreeNodeChild = { id: string; title: string; kind: NodeKind };

export type TreeNode = {
  id: string;
  title: string;
  kind: NodeKind;
  children?: TreeNodeChild[];
};
export type NodesTree = Record<string, TreeNode>;

// @ts-ignore
const isTopic = (value: string) => value.startsWith('##');
const prepareTopicTitle = (value: string) => value.replace('##', '').trim();

// @ts-ignore
const isSubTopic = (value: string) => value.startsWith('-');
const prepareSubTopicTitle = (value: string) => value.replace('-', '').trim();

export const transformTextToTree = (value: string) => {
  const splitedRows = value.split('\n');
  const tree: NodesTree = {};

  let lastTopicId = null;

  splitedRows.forEach((title) => {
    const id = v7();

    if (isTopic(title)) {
      lastTopicId = id;
      tree[id] = {
        id,
        title: prepareTopicTitle(title),
        kind: 'topic',
      };
    }

    if (isSubTopic(title)) {
      if (!tree[lastTopicId]?.children) {
        tree[lastTopicId].children = [];
      }

      tree[lastTopicId].children.push({
        title: prepareSubTopicTitle(title),
        id,
        kind: 'subtopic',
      });
    }
  });
  return tree;
};

export const getWidthNode = (text: string, font?: string) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const ff = getComputedStyle(document.body).fontFamily;
  const fw = getComputedStyle(document.body).fontWeight;

  context.font = font || `${fw} 20px ${ff}`;
  return context.measureText(text).width;
};
