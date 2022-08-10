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
import { FormHelperText, Paper } from "@mui/material";
import Particles from "react-tsparticles";
import particlesConfig from "../config/configParticles";
interface IProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setUnitAccess: React.Dispatch<React.SetStateAction<string[]>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
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
        Roip Monitoring
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

const SignIn = (props: IProps) => {
  const { setUsername, setIsAdmin, setUnitAccess, setAccessToken } = props;
  const [UsernameHelperText, setUsernameHelperText] = React.useState<
    string | undefined
  >(" ");
  const [passwordHelperText, setPasswordHelperText] = React.useState<
    string | undefined
  >(" ");
  console.log(UsernameHelperText);
  const navigate = useNavigate();
  const SendLoginRequest = async (
    username: string,
    password: string
  ): Promise<any> => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/login`,
        {
          username,
          password,
        }
      );
      setUsername(res.data.username);
      setIsAdmin(res.data.isAdmin);
      setUnitAccess(res.data.unitAccess);
      setAccessToken(res.data.accessToken);
      // console.log(res.data);
      navigate("/user-info");
      // setIsLoginPage(false);
      // setIsUnitPage(true);
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
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" fontWeight={"bold"}>
                  התחברות לינשוף
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="שם יחידה"
                    name="username"
                    autoFocus
                  />
                  <FormHelperText sx={{ color: "error.main", width:"20vw" }}>
                    {UsernameHelperText}
                  </FormHelperText>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="סיסמה"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormHelperText sx={{ color: "error.main" }}>
                    {passwordHelperText}
                  </FormHelperText>

                  <FormControlLabel
                    sx={{
                      width: "100%",
                      flexDirection: "row-reverse",
                      m: 0,
                    }}
                    control={<Checkbox value="remember" color="primary" />}
                    label="זכור אותי"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    התחבר
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        שכחת סיסמה?
                      </Link>
                    </Grid>
                  </Grid>
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
