import {
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Typography,
  Box,
} from "@mui/material";
import {
  Home,
  LogIn,
  ChevronLeft,
  ChevronRight,
  Settings,
  Calendar,
  Clock,
  Mic,
  Building2,
  Users,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Copyright from "./Copyright";

interface DrawerContentProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

export default function DrawerContent({
  isDrawerOpen,
  toggleDrawer,
}: DrawerContentProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Home", icon: <Home size={18} />, path: "/" },
    {
      text: "Organizations",
      icon: <Building2 size={18} />,
      path: "/organizations",
    },
    { text: "Events", icon: <Calendar size={18} />, path: "/events" },
    { text: "Attendance", icon: <Clock size={18} />, path: "/attendance" },
    { text: "Presenters", icon: <Mic size={18} />, path: "/presenters" },
    { text: "Users", icon: <Users size={18} />, path: "/users" },
    { text: "Login", icon: <LogIn size={18} />, path: "/login" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 48,
          px: [1],
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={toggleDrawer} size="small">
            {isDrawerOpen ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </IconButton>
          <Box sx={{ display: isDrawerOpen ? "" : "none" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                lineHeight: 1.2,
              }}
            >
              ConfMax
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "0.7rem",
                lineHeight: 1.2,
              }}
            >
              Conference Management
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <List sx={{ flex: "1 1 auto", overflowY: "auto", py: 0.5 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                minHeight: 36,
                justifyContent: isDrawerOpen ? "initial" : "center",
                px: 2,
                py: 0.5,
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.light,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDrawerOpen ? 2 : "auto",
                  justifyContent: "center",
                  color:
                    location.pathname === item.path
                      ? theme.palette.primary.main
                      : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isDrawerOpen && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: location.pathname === item.path ? 500 : 400,
                  }}
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
