import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import { getTheme } from "./theme";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Attendance from "./pages/Attendance";
import Presenters from "./pages/Presenters";
import Organizations from "./pages/Organizations";
import Users from "./pages/Users";

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
            <Route path="/events" element={<Events />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/presenters" element={<Presenters />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper />
    </ThemeProvider>
  );
}

export default App;
