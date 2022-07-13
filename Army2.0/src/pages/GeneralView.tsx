// עמוד מבט על

import { Box, Grid, Paper } from "@mui/material";
import { ReactQueryDevtools } from "react-query/devtools";
import React from "react";
import TableOfContents from "../components/TableOfContents";
import GeneralAccordion from "../components/GeneralAccordion";

type IProps = {
  selectedUnit: string;
  // devices: Array<oneDevice>;
};

const GeneralView = (props: IProps) => {
  const { selectedUnit } = props;
  return (
    <>
      <Grid container direction="column" sx={{ width: "100%" }}>
        {/* <Grid item xs={2} sx={{ mb: 2 }}>
          <TableOfContents />
        </Grid> */}
        <Grid item xs={10}>
          <GeneralAccordion selectedUnit={selectedUnit} />
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralView;
