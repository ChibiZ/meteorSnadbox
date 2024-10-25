import React from 'react';

import './styles.module.css';
import 'rc-tree/assets/index.css';

import Tree, { TreeNode } from 'rc-tree';
import { Card, CardBody } from '@chakra-ui/react';
import { StatusIndicator } from '/imports/ui/pages/roadmap/components/InfoNodePage/StatusIndicator';
import { TreeSettings } from './components/TreeSettings';
import { filterByStatuses } from './utils';

export const TaskTree = React.memo(({ data }) => {
  const treeRef = React.useRef();
  const [statuses, setStatuses] = React.useState([]);
  const [isExpandedAll, setExpandAll] = React.useState(false);

  const filteredTree = React.useMemo(() => {
    if (!statuses.length) return data;

    const filtered = filterByStatuses(data, statuses);

    return filtered;
  }, [data, statuses]);

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
    if (!isExpandedAll) {
      treeRef.current?.setExpandedKeys([]);
      return;
    }

    const { blocks } = filteredTree;
    const blocksAsArray = Object.values(blocks);
    const keys = blocksAsArray.flatMap((block, i) => [
      `0-${i}`,
      ...block.children.map((_, j) => `0-${i}-${j}`),
    ]);

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
        <Tree expandAction="click" ref={treeRef}>
          {Object.values(filteredTree.blocks).map((block) => (
            <TreeNode
              title={block.block}
              icon={<div className="tree-topic-node"></div>}
              className={'topic-node'}
              id={block.id}
              expanded={true}
              selectable={false}
            >
              {block.children?.map((groupId) => (
                <TreeNode
                  icon={<div className="tree-topic-node"></div>}
                  className={'topic-node'}
                  id={groupId}
                  title={filteredTree.groups[groupId].group}
                  expanded={true}
                  selectable={false}
                >
                  {filteredTree.groups[groupId].children?.map((skillId) => (
                    <TreeNode
                      expanded={true}
                      selectable={false}
                      id={skillId}
                      title={filteredTree.skills[skillId].skill}
                      isLeaf={true}
                      icon={
                        <StatusIndicator
                          status={filteredTree.skills[skillId].status}
                        />
                      }
                    ></TreeNode>
                  ))}
                </TreeNode>
              ))}
            </TreeNode>
          ))}
        </Tree>
      </CardBody>
    </Card>
  );
});
