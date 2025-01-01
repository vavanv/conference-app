import React from 'react';
import { 
  Toolbar, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemIcon, 
  ListItemText,
  IconButton,
  useTheme
} from '@mui/material';
import { Home, LogIn, ChevronLeft, ChevronRight, Grid as GridIcon, Table as TableIcon, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Copyright from './Copyright';

interface DrawerContentProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

export default function DrawerContent({ isDrawerOpen, toggleDrawer }: DrawerContentProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Grid', icon: <GridIcon />, path: '/grid' },
    { text: 'Table', icon: <TableIcon />, path: '/table' },
    { text: 'Contacts', icon: <Users />, path: '/contacts' },
    { text: 'Login', icon: <LogIn />, path: '/login' }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%' 
    }}>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        px: [1]
      }}>
        <IconButton onClick={toggleDrawer}>
          {isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <List sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? 'initial' : 'center',
                px: 2.5,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 0,
                  mr: isDrawerOpen ? 3 : 'auto',
                  justifyContent: 'center',
                  color: location.pathname === item.path ? theme.palette.primary.main : 'inherit'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isDrawerOpen && (
                <ListItemText 
                  primary={item.text} 
                  sx={{ opacity: 1 }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Copyright isDrawerOpen={isDrawerOpen} />
    </div>
  );
}