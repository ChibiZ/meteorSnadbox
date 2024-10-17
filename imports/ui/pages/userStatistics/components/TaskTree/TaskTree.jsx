import React from 'react';

import './styles.module.css';
import 'rc-tree/assets/index.css';

import Tree, { TreeNode } from 'rc-tree';
import { Card, CardBody } from '@chakra-ui/react';
import { StatusIndicator } from '../../../roadmap/components/InfoNodePage/StatusIndicator';
import { TreeSettings } from './components/TreeSettings';

export const TaskTree = React.memo(({ data }) => {
  const treeRef = React.useRef();
  const [statuses, setStatuses] = React.useState([]);
  const [isExpandedAll, setExpandAll] = React.useState(false);

  const filteredTree = statuses.length
    ? data
        .map((node) => ({
          ...node,
          children: node.children?.filter(({ status }) =>
            statuses.includes(status),
          ),
        }))
        .filter((node) => node?.children.length)
    : data;

  const onChangeFilter =
    (value) =>
    ({ target: { checked } }) => {
      setStatuses((prev) => {
        if (checked) {
          return [...prev, value];
        } else {
          return prev.filter((v) => v !== value);
        }
      });
    };

  React.useEffect(() => {
    console.log(isExpandedAll);
    if (!isExpandedAll) {
      treeRef.current?.setExpandedKeys([]);
      return;
    }
    const keys = filteredTree.map((node, i) => `0-${i}`);

    treeRef.current?.setExpandedKeys(keys);
  }, [isExpandedAll, filteredTree]);

  return (
    <Card my={2}>
      <CardBody>
        <TreeSettings
          onChangeFilter={onChangeFilter}
          onToggle={setExpandAll}
          isExpandedAll={isExpandedAll}
        />
        <Tree
          expandAction="click"
          ref={treeRef}
          onExpand={(e) => console.log(e)}
        >
          {filteredTree.map((node) => (
            <TreeNode
              title={node.label}
              icon={<div className="tree-topic-node"></div>}
              className={'topic-node'}
              selectable={false}
              id={node.id}
            >
              {node.children?.map((child) => (
                <TreeNode
                  expanded={true}
                  selectable={false}
                  id={child.id}
                  title={child.label}
                  isLeaf={true}
                  icon={<StatusIndicator status={child.status} />}
                ></TreeNode>
              ))}
            </TreeNode>
          ))}
        </Tree>
      </CardBody>
    </Card>
  );
});
