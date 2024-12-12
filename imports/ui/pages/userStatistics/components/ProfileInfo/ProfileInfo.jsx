import React from 'react';
import {
  Card,
  CardBody,
  Text,
  Avatar,
  AvatarBadge,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { getFullName } from '/imports/ui/shared/formats';
import { getGradeTitleById } from '../../../../shared';

export const ProfileInfo = ({ data }) => {
  return (
    <Card>
      <CardBody display="flex" alignItems="center">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar name={getFullName(data)}>
            <AvatarBadge size="1.25em" bg="green.500" />
          </Avatar>
          <div style={{ textAlign: 'center' }}>
            <Text fontWeight={500} style={{ marginLeft: 5 }}>
              {`${getFullName(data)}`}{' '}
              <Badge ml="2">{getGradeTitleById(data.grade)}</Badge>
            </Text>
          </div>
        </div>
        {data && (
          <div style={{ marginLeft: 50 }}>
            <Badge colorScheme="blue" ml="2">
              {data.statistics.percent}% Done
            </Badge>
            <Badge colorScheme="green" ml="2">
              {data.statistics.doneTaskCount} completed
            </Badge>
            <Badge colorScheme="yellow" ml="2">
              {data.statistics.inProgressTaskCount} in progress
            </Badge>
            <Badge colorScheme="black.800" ml="2">
              · {data.statistics.total} Total Track Progress
            </Badge>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
