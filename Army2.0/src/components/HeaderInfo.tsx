import { Box, Grid, Typography } from "@mui/material";
import React from "react";

type IProps = {
  userName: string;
  Permissions: string;
  lastLogIn: string;
  pakalMonitored: string;
};

const HeaderInfo = (props: IProps) => {
  const { userName, Permissions, lastLogIn, pakalMonitored } = props;
  return (
    <Box>
      <Typography
        variant="h5"
        component="div"
        sx={{ color: "rgba(0, 0, 0, 0.87)", py: 0.5, pr: 3 }}
      >
        <Grid
          container
          spacing={12}
          sx={{
            fontSize: 15,
          }}
        >
          <Grid item>
            <Box sx={{ fontWeight: "bold" }}> שם משתמש </Box>
            <Box>{userName}</Box>
          </Grid>
          <Grid item>
            <Box sx={{ fontWeight: "bold" }}> הרשאות ליחידות </Box>
            <Box>{Permissions}</Box>
          </Grid>
          <Grid item>
            <Box sx={{ fontWeight: "bold" }}> התחברות אחרונה </Box>
            <Box>{lastLogIn}</Box>
          </Grid>
          <Grid item>
            <Box sx={{ fontWeight: "bold" }}> פק''ל מנוטר </Box>
            <Box>{pakalMonitored}</Box>
          </Grid>
        </Grid>
      </Typography>
    </Box>
  );
};

export default HeaderInfo;
