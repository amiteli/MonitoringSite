// טבלת השליטה בעמוד הראשי

import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import PureComponent from "./PureTable";

interface IProps {
  accessToken: string;
  selectedUnit: string;
}
