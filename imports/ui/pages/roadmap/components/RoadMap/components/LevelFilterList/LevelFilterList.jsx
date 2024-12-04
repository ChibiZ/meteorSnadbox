import React from 'react';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { LEVELS } from '/imports/ui/shared';

export const LevelFilterList = ({ onChange, value }) => {
  return (
    <div className="filter-level-list">
      <CheckboxGroup
        colorScheme="green"
        defaultValue={LEVELS.map((level) => level.name)}
        value={value}
        onChange={onChange}
        size={'sm'}
      >
        <Stack spacing={[0, 3]} direction={['row']}>
          {LEVELS.map((level) => (
            <Checkbox key={level.id} value={level.name} size={'sm'}>
              {level.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </div>
  );
};
