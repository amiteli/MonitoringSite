import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HeaderAppBar from "./HeaderAppBar";
import { Routes, Route, Navigate, generatePath } from "react-router-dom";
import GeneralView from "../pages/GeneralView";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaLayerGroup,
  FaChartPie,
  FaStar,
} from "react-icons/fa";
import { RiAccountCircleFill, RiHeartPulseFill } from "react-icons/ri";
import { BsTable, BsGearFill, BsInfoCircleFill } from "react-icons/bs";
import About from "../pages/About";
import FavoriteDevices from "../pages/FavoriteDevices";
import Pinger from "../pages/Pinger";
import VersionViewer from "../pages/VersionViewer";
import UserInfo from "../pages/UserInfo";
import MapMonitor from "../pages/MapMonitor";
import StatisticsGraphs from "../pages/StatisticsGraphs";
import DeviceMonitor from "../pages/DeviceMonitor";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 220;

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
    icon: <RiAccountCircleFill />,
    navigationTo: "/user-info",
  },
  {
    title: "מבט על",
    icon: <FaLayerGroup />,
    navigationTo: "/general-view",
  },
  {
    title: "ניטור מפורט",
    icon: <BsTable />,
    navigationTo: "/device-monitor",
  },
  {
    title: "סטיסטיקות",
    icon: <FaChartPie />,
    navigationTo: "/statistics-graphs",
  },
  {
    title: "ניטור מפתי",
    icon: <FaMapMarkedAlt />,
    navigationTo: "/map-monitor",
  },
  {
    title: "בקרת תצוגה",
    icon: <BsGearFill />,
    navigationTo: "/version-viewer",
  },
  {
    title: "פינגר כלים",
    icon: <RiHeartPulseFill />,
    navigationTo: "/pinger",
  },
  {
    title: "ניטור מועדפים",
    icon: <FaStar />,
    navigationTo: "/favorite-devices",
  },
  {
    title: "אודות המערכת",
    icon: <BsInfoCircleFill />,
    navigationTo: "/about",
  },
];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
  zIndex: theme.zIndex.drawer + 10000,
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
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

export default function SideMenu() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const PageClicked = (page: string) => {
    navigate(page);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const buttonProps = (value: number) => ({
    selected: selectedIndex === value,
    onClick: () => setSelectedIndex(value),
  });
  const routes = [
    "/Makmashim",
    "/RCGW",
    "/CCU",
    "/CCT",
    "/Yadbar",
    "/Deploy",
  ];
  return (
    <Box>
      <CssBaseline />
      <HeaderAppBar HeaderData={HeaderData} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer variant="permanent" open={open} anchor="right">
          <DrawerHeader></DrawerHeader>
          <Divider />
          <List
            component="nav"
            sx={{
              "& .MuiListItemButton-root:hover": {
                bgcolor: "secondary",
                "&, & .MuiListItemIcon-root": {
                  color: "black",
                },
              },
            }}
          >
            {sideBarMenuList.map((page, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => PageClicked(page.navigationTo)}
              >
                <ListItemButton {...buttonProps(index)}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      ml: 3,
                    }}
                  >
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={page.title}
                    sx={{ opacity: open ? 1 : 0, textAlign: "start" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/favorite-devices" element={<FavoriteDevices />} />
            <Route path="/pinger" element={<Pinger />} />
            <Route path="/version-viewer" element={<VersionViewer />} />
            <Route path="/map-monitor" element={<MapMonitor />} />
            <Route path="/statistics-graphs" element={<StatisticsGraphs />} />
            <Route
              path="/device-monitor/"
              element={<DeviceMonitor selectedUnit={selectedUnit} tab={0}/>}
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
              element={<DeviceMonitor selectedUnit={selectedUnit} tab={2}/>}
            />
            <Route
              path="/device-monitor/CCT"
              element={<DeviceMonitor selectedUnit={selectedUnit} tab={3}/>}
            />
            <Route
              path="/device-monitor/Yadbar"
              element={<DeviceMonitor selectedUnit={selectedUnit} tab={4}/>}
            />
            <Route
              path="/device-monitor/Deploy"
              element={<DeviceMonitor selectedUnit={selectedUnit} tab={5}/>}
            />
            <Route path="/general-view" element={<GeneralView selectedUnit={selectedUnit} />}/>
            <Route path="user-info" element={<UserInfo />} />
            <Route path="*" element={<Navigate to="/user-info" />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
