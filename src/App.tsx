import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import { getTheme } from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Organizations from './pages/Organizations';
import Events from './pages/Events';
import Speakers from './pages/Speakers';
import Attendance from './pages/Attendance'; // Added import
import Contacts from './pages/Contacts';
import Account from './pages/Account';

const ThemeWrapper = () => {
  const { themeMode } = useThemeContext();
  
  return (
    <MuiThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/events" element={<Events />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/attendance" element={<Attendance />} /> {/* Added route */}
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper />
    </ThemeProvider>
  );
}
