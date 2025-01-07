import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import { getTheme } from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Employees from './pages/Employees';
import Contacts from './pages/Contacts';
import Companies from './pages/Companies';
import Events from './pages/Events';
import Attendance from './pages/Attendance';
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
            <Route path="/employees" element={<Employees />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/events" element={<Events />} />
            <Route path="/attendance" element={<Attendance />} />
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
