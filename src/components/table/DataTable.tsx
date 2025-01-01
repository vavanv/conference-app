import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { useTableData } from '../../hooks/useTableData';
import { TableToolbar } from './TableToolbar';
import { TableLoadingSkeleton } from './TableLoadingSkeleton';
import { EditDrawer } from './EditDrawer';
import { FilterDrawer } from './FilterDrawer';
import { TableData } from '../../types/table';

export default function DataTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRecord, setSelectedRecord] = useState<TableData | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { 
    data, 
    isLoading, 
    sortConfig, 
    filters,
    handleSort, 
    updateRecord,
    handleFilter 
  } = useTableData();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (record: TableData) => {
    setSelectedRecord(record);
  };

  if (isLoading) return <TableLoadingSkeleton />;

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TableToolbar 
        onOpenFilter={() => setIsFilterOpen(true)}
        filters={filters}
      />
      <TableContainer sx={{ flex: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'name'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'position'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('position')}
                >
                  Position
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'location'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('location')}
                >
                  Location
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortConfig.key === 'salary'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('salary')}
                >
                  Salary
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow 
                  hover 
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell align="right">${row.salary.toLocaleString()}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      <EditDrawer
        open={!!selectedRecord}
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onSave={updateRecord}
      />
      
      <FilterDrawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleFilter}
        currentFilters={filters}
      />
    </Paper>
  );
}