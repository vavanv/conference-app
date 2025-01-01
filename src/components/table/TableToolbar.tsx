import React from 'react';
import { alpha, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import { Download, Filter } from 'lucide-react';

export function TableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: (theme) =>
          alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Employee Data
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <Filter />
        </IconButton>
      </Tooltip>
      <Tooltip title="Export data">
        <IconButton>
          <Download />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}