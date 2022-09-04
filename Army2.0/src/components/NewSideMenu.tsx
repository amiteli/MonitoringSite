import * as React from "react";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NewHeaderAppBar from "./NewHeaderAppBar";
import {
  FaMapMarkedAlt,
  FaLayerGroup,
  FaChartPie,
  FaStar,
} from "react-icons/fa";
import { RiAccountCircleFill, RiHeartPulseFill } from "react-icons/ri";
import { BsTable, BsGearFill, BsInfoCircleFill } from "react-icons/bs";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import About from "../pages/About";
import FavoriteDevices from "../pages/FavoriteDevices";
import Pinger from "../pages/Pinger";
import VersionViewer from "../pages/VersionViewer";
import UserInfo from "../pages/UserInfo";
import MapMonitor from "../pages/MapMonitor";
import StatisticsGraphs from "../pages/StatisticsGraphs";
import DeviceMonitor from "../pages/DeviceMonitor";
import GeneralView from "../pages/GeneralView";
import { Height, Login } from "@mui/icons-material";
import { flexbox } from "@mui/system";
import SignIn from "./SignIn";
import { Container, ThemeProvider } from "react-bootstrap";
import { Dialog } from "@mui/material";

const drawerWidth = 240;

const selectedUnit = "36";

const HeaderData = {
  userName: "עמי ותמי",
  Permissions: "בית המכשפה",
  lastLogIn: "14:24 - 01/06/2022",
  pakalMonitored: "b1g d",
};

const sideBarMenuList = [
  {
    title: "נתוני משתמש וכלים",
    icon: <RiAccountCircleFill size={20} />,
    navigationTo: "/user-info",
  },
  {
    title: "מבט על",
    icon: <FaLayerGroup size={20} />,
    navigationTo: "/general-view",
  },
  {
    title: "ניטור מפורט",
    icon: <BsTable size={20} />,
    navigationTo: "/device-monitor",
  },
  {
    title: "סטיסטיקות",
    icon: <FaChartPie size={20} />,
    navigationTo: "/statistics-graphs",
  },
  {
    title: "ניטור מפתי",
    icon: <FaMapMarkedAlt size={20} />,
    navigationTo: "/map-monitor",
  },
  {
    title: "בקרת תצוגה",
    icon: <BsGearFill size={20} />,
    navigationTo: "/version-viewer",
  },
  {
    title: "פינגר כלים",
    icon: <RiHeartPulseFill size={20} />,
    navigationTo: "/pinger",
  },
  {
    title: "ניטור מועדפים",
    icon: <FaStar size={20} />,
    navigationTo: "/favorite-devices",
  },
  {
    title: "אודות המערכת",
    icon: <BsInfoCircleFill size={20} />,
    navigationTo: "/about",
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const PageClicked = (page: string) => {
    navigate(page);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [username, setUsername] = React.useState(" ");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [unitAccess, setUnitAccess] = React.useState<Array<string>>([]);
  const [accessToken, setAccessToken] = React.useState<string>("");
  // const [selectedUnit, setSelectedUnit] = React.useState(" ");

  return (
    <Box display={"flex"}>
      <AppBar
        position="fixed"
        open={open}
        style={{
          background: "#2E3B55",
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="end"
            sx={{
              marginLeft: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <NewHeaderAppBar HeaderData={HeaderData} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          style: {
            left: "unset",
            right: 0,
            paddingTop: theme.spacing(4),
            // paddingBottom: theme.spacing(2),
          },
        }}
      >
        <DrawerHeader sx={{ paddingTop: theme.spacing(2) }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideBarMenuList.map((element, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => PageClicked(element.navigationTo)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: open ? 1 : 3,
                  marginBottom: "25px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    marginLeft: open ? "15px" : 0,
                    color: "#2E3B55",
                  }}
                >
                  {element.icon}
                </ListItemIcon>
                <ListItemText
                  primary={element.title}
                  sx={{ opacity: open ? 1 : 0, textAlign: "right" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ width: "100%", p: 2, paddingTop: theme.spacing(6) }}
      >
        <DrawerHeader />
        <Routes>
          <Route
            path="/login-page"
            element={
              <Dialog fullScreen open={true}>
                  <SignIn
                    setUsername={setUsername}
                    setIsAdmin={setIsAdmin}
                    setUnitAccess={setUnitAccess}
                    setAccessToken={setAccessToken}
                  />
              </Dialog>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/favorite-devices" element={<FavoriteDevices />} />
          <Route path="/pinger" element={<Pinger />} />
          <Route path="/version-viewer" element={<VersionViewer />} />
          <Route path="/map-monitor" element={<MapMonitor />} />
          <Route
            path="/statistics-graphs"
            element={<StatisticsGraphs selectedUnit={selectedUnit} />}
          />
          <Route
            path="/device-monitor/"
            element={<DeviceMonitor selectedUnit={selectedUnit} tab={0} />}
          />
          <Route
            path="/device-monitor/Makmashim"
            element={<DeviceMonitor selectedUnit={selectedUnit} tab={0} />}
          />
          <Route
            path="/device-monitor/RCGW"
            element={<DeviceMonitor selectedUnit={selectedUnit} tab={1} />}
          />
          <Route
            path="/device-monitor/CCU"
            element={<DeviceMonitor selectedUnit={selectedUnit} tab={2} />}
          />
          <Route
            path="/device-monitor/CCT"
            element={<DeviceMonitor selectedUnit={selectedUnit} tab={3} />}
          />
          <Route
            path="/device-monitor/Yadbar"
            element={<DeviceMonitor selectedUnit={selectedUnit} tab={4} />}
          />
          <Route
            path="/device-monitor/Deploy"
            element={<DeviceMonitor selectedUnit={selectedUnit} tab={5} />}
          />
          <Route
            path="/general-view"
            element={<GeneralView selectedUnit={selectedUnit} />}
          />
          <Route path="user-info" element={<UserInfo />} />
          <Route path="*" element={<Navigate to="/login-page" />} />
        </Routes>
      </Box>
    </Box>
  );
}
