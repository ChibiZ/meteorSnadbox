import React from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Container } from '@chakra-ui/react';

import { createColumns } from './columns';
import { useTableData } from './useTableData';
import { useAdminActions } from './useAdminActions'; // Optional Theme applied to the Data Grid

const gridOptions = { domLayout: 'autoHeight' };

const Statistics = () => {
  const { rowData, getData, isLoading } = useTableData();
  const { onChangeRole, onRemove } = useAdminActions(getData);
  const [colDefs] = React.useState(createColumns({ onChangeRole, onRemove }));

  return (
    <Container padding={1} height={'100%'} width="100%" maxW={'100%'}>
      <div className="ag-theme-quartz">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          gridOptions={gridOptions}
          loading={isLoading}
        />
      </div>
    </Container>
  );
};

export default Statistics;
