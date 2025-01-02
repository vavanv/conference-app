import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon } from 'lucide-react';
import DrawerContent from './DrawerContent';
import BottomControl from './common/BottomControl';

const drawerWidth = 240;
const minDrawerWidth = 56; // Reduced from 73 to 56
const bottomControlHeight = 32;
const appBarHeight = 48;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { sm: `calc(100% - ${isDrawerOpen ? drawerWidth : minDrawerWidth}px)` },
          ml: { sm: isDrawerOpen ? `${drawerWidth}px` : `${minDrawerWidth}px` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon size={18} />
          </IconButton>
          <Typography variant="subtitle1" noWrap component="div">
            My App
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ 
          width: { sm: isDrawerOpen ? drawerWidth : minDrawerWidth },
          flexShrink: { sm: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: drawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          <DrawerContent isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        </Drawer>
        
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: isDrawerOpen ? drawerWidth : minDrawerWidth,
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open={isDrawerOpen}
        >
          <DrawerContent isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isDrawerOpen ? drawerWidth : minDrawerWidth}px)` },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          mt: `${appBarHeight}px`,
          mb: `${bottomControlHeight}px`,
          height: `calc(100vh - ${appBarHeight}px - ${bottomControlHeight}px)`,
          overflow: 'hidden'
        }}
      >
        {children}
      </Box>
      
      <BottomControl drawerWidth={drawerWidth} minDrawerWidth={minDrawerWidth} />
    </Box>
  );
}