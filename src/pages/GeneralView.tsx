// עמוד מבט על

import { Box, Grid, Paper } from "@mui/material";
import { ReactQueryDevtools } from "react-query/devtools";
import React from "react";
import TableOfContents from "../components/TableOfContents";

type IProps = {
  selectedUnit: string;
};

const GeneralView = (props: IProps) => {
  return (
    <>
      <Grid container direction="column" sx={{ width: "90vw" }}>
        <Grid item xs={10}>
          {/* <GeneralBlock
            // accessToken={accessToken}
            selectedUnit={selectedUnit}
            // favoriteStations={favoriteStations}
            // setFavoriteStations={setFavoriteStations}
          /> */}
        </Grid>
        <Grid item xs={2}>
          <TableOfContents />
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralView;
