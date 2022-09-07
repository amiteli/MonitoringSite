import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HeaderInfo from "./HeaderInfo";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setJwtToken, setRefreshToken } from "./TokenController";


interface IProps {
  HeaderData: HeaderData;
}

type HeaderData = {
  userName: string;
  Permissions: string;
  lastLogIn: string;
  pakalMonitored: string;
};

const settings = ["פרופיל", "חשבון", "Dashboard", "יציאה"];



const ResponsiveAppBar = (props: IProps) => {
  const navigate = useNavigate();
  const { HeaderData } = props;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting: string) => {
    
    if (setting=="יציאה") {
      setJwtToken('')
      setRefreshToken('')
      navigate('/login-page');
    }
    setAnchorElUser(null);
  };

  return (
    <Container maxWidth={false}>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 2 }}>
          {/* add relevant icons right here */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        </Box>

        {Object.entries(HeaderData).map(([key, value]) => (
          <Box sx={{ flexGrow: 2 }}>
            <Grid item>
              <Box
                sx={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#ffffff",
                }}
              >
                {key}
              </Box>
              <Box sx={{ color: "#ffffff", fontSize: 16 }}>{value}</Box>
            </Grid>
          </Box>
        ))}

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            sx={{ marginLeft: "7px" }}
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Tooltip title="פתח הגדרות">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  );
};
export default ResponsiveAppBar;
