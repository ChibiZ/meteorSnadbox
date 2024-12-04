import { Button, FormControl, IconButton, Switch } from '@chakra-ui/react';
import React from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
export const createColumns = ({ onChangeRole, onRemove }) => {
  return [
    { field: 'id', width: 100, headerName: 'ID' },
    {
      field: 'username',
      width: 200,
      headerName: 'Имя',
      cellRenderer: (props) => {
        return (
          <Link
            to={`/statistics/${props.data.id}?roadmapId=${props.data.roadmapId}`}
            style={{ textDecoration: 'underline' }}
          >
            {props.data.username}
          </Link>
        );
      },
    },
    { field: 'createdAt', width: 150, headerName: 'Создан' },
    { field: 'done', width: 100, headerName: 'Done' },
    { field: 'inProgress', width: 120, headerName: 'In progress' },
    {
      field: 'percent',
      headerName: 'Процент',
      valueFormatter: (params) => params.value + '%',
      width: 100,
    },
    { field: 'total', width: 100, headerName: 'Всего' },

    {
      field: 'role',
      width: 100,
      headerName: 'Админ',
      cellRenderer: (props) => {
        const role = props.value ?? 'Member';

        return (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FormControl display="flex" alignItems="center">
              <Switch
                size="md"
                isChecked={role === 'Admin'}
                onChange={(e) => {
                  onChangeRole({
                    id: props.data.id,
                    value: e.target.checked,
                  });
                }}
              />
            </FormControl>
          </div>
        );
      },
    },

    {
      field: 'remove',
      headerName: '',
      cellRenderer: (params) => {
        return (
          <Button
            size="sm"
            colorScheme="red"
            rightIcon={<DeleteIcon />}
            onClick={() => onRemove(params.data.id)}
          >
            Удалить
          </Button>
        );
      },
    },
  ];
};
