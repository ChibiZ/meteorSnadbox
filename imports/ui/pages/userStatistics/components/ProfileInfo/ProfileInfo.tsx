import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Avatar,
  AvatarBadge,
  Badge,
} from '@chakra-ui/react';

interface Props {}

export const ProfileInfo = ({ user, data }: React.PropsWithChildren<Props>) => {
  return (
    <Card>
      <CardBody display="flex" alignItems="center">
        <div>
          <Avatar name={user.username}>
            <AvatarBadge size="1.25em" bg="green.500" />
          </Avatar>
          <Text>{user.username}</Text>
        </div>
        {data && (
          <div style={{ marginLeft: 50 }}>
            <Badge colorScheme="blue" ml="2">
              {data.percent}% Done
            </Badge>
            <Badge colorScheme="green" ml="2">
              {data.doneTaskCount} completed
            </Badge>
            <Badge colorScheme="yellow" ml="2">
              {data.inProgressTaskCount} in progress
            </Badge>

            <Badge colorScheme="black.800" ml="2">
              · {data.total} Total Track Progress
            </Badge>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
