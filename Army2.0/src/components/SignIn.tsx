import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import { FormHelperText, Paper, IconButton } from "@mui/material";
import Particles from "react-tsparticles";
import particlesConfig from "../config/configParticles";
import  logo  from "../images/logo/logo.png"
import {getJwtToken, setJwtToken, getRefreshToken, setRefreshToken} from './TokenController'
 
interface IProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setUnitAccess: React.Dispatch<React.SetStateAction<string[]>>;
}

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        yanshuf.tng.topsecret
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};

const theme = createTheme({ direction: "rtl" });
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const SignIn = (props: IProps) => 
{
  // const [cookies, setCookie, removeCookie] = useCookies(["access", "refresh"]);
  const [changeUser, setChangeUser] = React.useState(null);
  const [changePass, setChangePass] = React.useState(null);
  const onChangeUsername = (e: any) => setChangeUser(e.target.value);
  const onChangePassword = (e: any) => setChangePass(e.target.value);
  const canSave = Boolean(changeUser) && Boolean(changePass);
  const { setUsername, setIsAdmin, setUnitAccess } = props;
  const [UsernameHelperText, setUsernameHelperText] = React.useState<
    string | undefined
  >(" ");
  const [passwordHelperText, setPasswordHelperText] = React.useState<
    string | undefined
  >(" ");
// console.log(getJwtToken())
  const navigate = useNavigate();
  const SendLoginRequest = async (
    username: string,
    password: string
  ): Promise<any> => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/Members/token`,
        {
          username,
          password,
        }
      );
      setUsername(res.data.username);
      setIsAdmin(res.data.isAdmin);
      setUnitAccess(res.data.unitAccess);
      setJwtToken(res.data.access)
      setRefreshToken(res.data.refresh)
      // setCookie("access", res.data.access);
      // setCookie("refresh", res.data.refresh);

      

      navigate("/device-monitor");
    } catch (err) {
      setPasswordHelperText("שם המשתמש או הסיסמה שגויים");
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = String(data.get("username"));
    const password = String(data.get("password"));

    if (username.length < 5 || password.length < 5) {
      if (username.length < 5)
        setUsernameHelperText("שם משתמש חייב לכלול לפחות 5 תווים");
      else setUsernameHelperText(" ");
      if (password.length < 5)
        setPasswordHelperText("סיסמה חייבת לכלול לפחות 5 תווים");
      else setPasswordHelperText(" ");
    } else {
      setUsernameHelperText(" ");
      setPasswordHelperText(" ");
      const x = SendLoginRequest(username, password);
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs wrap={"nowrap"}></Grid>
        <Grid item xs>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pt: "28%",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "#2e3b55",height:70, width:70, border:"4px #F0BC5F solid" }} >
                    <img src={logo} height={70} alt="logo" style={{marginTop:5}}/>
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  fontWeight={"bold"}
                  color={"#2e3b55"}
                >
                  התחברות לינשוף
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    value={changeUser}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="שם יחידה"
                    name="username"
                    autoFocus
                    onChange={onChangeUsername}
                  />
                  <FormHelperText sx={{ color: "error.main", width: "20vw" }}>
                    {UsernameHelperText}
                  </FormHelperText>
                  <TextField
                    value={changePass}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="סיסמה"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onChangePassword}
                  />
                  <FormHelperText sx={{ color: "error.main" }}>
                    {passwordHelperText}
                  </FormHelperText>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!canSave}
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#2e3b55",
                      "&:hover": {
                        backgroundColor: "#2e3b55",
                      },
                    }}
                  >
                    התחבר
                  </Button>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </ThemeProvider>
          </CacheProvider>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
};
export default SignIn;
