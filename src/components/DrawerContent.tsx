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
import { 
  Home, LogIn, ChevronLeft, ChevronRight, Users, 
  UserCircle, Settings, Building, Calendar, Mic, ClipboardList 
} from 'lucide-react';
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
    { text: 'Home', icon: <Home size={18} />, path: '/' },
    { text: 'Organizations', icon: <Building size={18} />, path: '/organizations' },
    { text: 'Events', icon: <Calendar size={18} />, path: '/events' },
    { text: 'Speakers', icon: <Mic size={18} />, path: '/speakers' },
    { text: 'Attendance', icon: <ClipboardList size={18} />, path: '/attendance' },
    { text: 'Contacts', icon: <Users size={18} />, path: '/contacts' },
    { text: 'Account', icon: <Settings size={18} />, path: '/account' },
    { text: 'Login', icon: <LogIn size={18} />, path: '/login' }
  ];

  return (
    <>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: isDrawerOpen ? 'flex-end' : 'center',
        px: [1],
        minHeight: '48px !important'
      }}>
        <IconButton onClick={toggleDrawer}>
          {isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            disablePadding 
            sx={{ 
              display: 'block',
              '&:hover': {
                backgroundColor: theme.palette.action.hover
              }
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDrawerOpen ? 3 : 'auto',
                  justifyContent: 'center',
                  color: location.pathname === item.path ? 
                    theme.palette.primary.main : 
                    theme.palette.text.secondary
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: isDrawerOpen ? 1 : 0,
                  color: location.pathname === item.path ? 
                    theme.palette.primary.main : 
                    theme.palette.text.secondary
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Copyright isDrawerOpen={isDrawerOpen} />
    </>
  );
}
