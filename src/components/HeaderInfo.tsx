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
    <Box sx={{ justifyContent: "center", alignItems: "center" }}>
      <Typography
        textAlign="center"
        variant="h5"
        component="div"
        sx={{ py: 0.5, pr: 3 }}
      >
        <Grid
          container
          spacing={12}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Box> שם משתמש </Box>
            <Box sx={{ fontWeight: "bold" }}>{userName}</Box>
          </Grid>
          <Grid item>
            <Box> הרשאות ליחידות </Box>
            <Box sx={{ fontWeight: "bold" }}>{Permissions}</Box>
          </Grid>
          <Grid item>
            <Box> התחברות אחרונה </Box>
            <Box sx={{ fontWeight: "bold" }}>{lastLogIn}</Box>
          </Grid>
          <Grid item>
            <Box> פק''ל מנוטר </Box>
            <Box sx={{ fontWeight: "bold" }}>{pakalMonitored}</Box>
          </Grid>
        </Grid>
      </Typography>
    </Box>
  );
};

export default HeaderInfo;
