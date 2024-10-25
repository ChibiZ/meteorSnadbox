import React from 'react';

import { Checkbox, Stack, Divider } from '@chakra-ui/react';
import { TaskStatus } from '/imports/ui/shared';

export const TreeSettings = ({ onChangeFilter, onToggle, isExpandedAll }) => {
  return (
    <div>
      <Stack spacing={5} direction="row">
        <Checkbox
          colorScheme="green"
          onChange={onChangeFilter(TaskStatus.Done)}
        >
          Done
        </Checkbox>
        <Checkbox
          colorScheme="orange"
          onChange={onChangeFilter(TaskStatus.InProgress)}
        >
          In progress
        </Checkbox>

        <Checkbox
          onChange={(e) => onToggle(e.target.checked)}
          value={isExpandedAll}
        >
          Раскрыть/Свернуть
        </Checkbox>
      </Stack>
      <Divider orientation="horizontal" my={4} />
    </div>
  );
};
