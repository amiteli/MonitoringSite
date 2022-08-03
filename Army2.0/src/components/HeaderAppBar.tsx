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
import screw from "../images/screw.png";
import HeaderInfo from "./HeaderInfo";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface IProps {
  HeaderData: HeaderData;
}

// const HeaderData = {
//   userName: "עמי ותמי",
//   Permissions: "בית המכשפה",
//   lastLogIn: "14:24 - 01/06/2022",
//   pakalMonitored: "b1g d",
// };

type HeaderData = {
  userName: string;
  Permissions: string;
  lastLogIn: string;
  pakalMonitored: string;
};

const information = [
  "שם אוגדה",
  "הרשאות ליחידה",
  "התחברות לאחרונה",
  "פקל מנטר",
];
const settings = ["פרופיל", "הגדרות", "יציאה"];

const HeaderAppBar = (props: IProps) => {
  const { HeaderData } = props;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        textAlign: "center",
        backgroundColor: "white",
        height: "80px",
        color: "black",
        borderBottom: "2px solid grey",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          p: 0,
        }}
      >
        <Toolbar disableGutters>
          <Button>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              // onClick={handleClick}
            >
              <ArrowForwardIosIcon />
              {/* {open ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />} */}
            </IconButton>
          </Button>
          <Avatar
            alt="screw"
            src={screw}
            sx={{
              width: 56,
              height: 56,
              display: { xs: "none", md: "flex" },
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mx: 5,
              display: { xs: "none", md: "flex" },
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              mr: 1.5,
            }}
          >
            צוות בורג
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* TODO: ELIAV HELP */}
              {/* {HeaderData &&
                Object.keys(HeaderData).forEach((e) => {
                  // console.log(e);

                  <MenuItem key={e} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      {e}: {HeaderData[e]}
                    </Typography>
                  </MenuItem>;
                })} */}
              {/* {information.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Avatar
            alt="screw"
            src={screw}
            sx={{
              width: 56,
              height: 56,
              mr: 2,
              display: { xs: "flex", md: "none" },
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            בורג
          </Typography>
          <Box
            flexGrow="3"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <HeaderInfo
              userName={HeaderData.userName}
              Permissions={HeaderData.Permissions}
              lastLogIn={HeaderData.lastLogIn}
              pakalMonitored={HeaderData.pakalMonitored}
            />
          </Box>
          <Box sx={{ flexGrow: 0.5 }}>
            <Tooltip title="להגדרות לחץ כאן">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="name1" src="" />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderAppBar;
