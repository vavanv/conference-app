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

  // ... rest of the component code ...
}
