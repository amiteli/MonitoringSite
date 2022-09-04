// עמוד מבט על

import { Box, Grid, Paper } from "@mui/material";
import { ReactQueryDevtools } from "react-query/devtools";
import React from "react";
import TableOfContents from "../components/TableOfContents";
import GeneralAccordion from "../components/GeneralAccordion";
import { Container } from "react-bootstrap";

type IProps = {
  selectedUnit: string;
  // devices: Array<oneDevice>;
};

const GeneralView = (props: IProps) => {
  const { selectedUnit } = props;

  return (
    <GeneralAccordion selectedUnit={selectedUnit} />
  );
};

export default GeneralView;
