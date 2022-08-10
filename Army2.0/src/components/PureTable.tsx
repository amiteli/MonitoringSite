import { Box, Checkbox, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  heIL,
} from "@mui/x-data-grid";
import { useState } from "react";
import { renderProgress } from "./ProgressBarTableCell";
import "../components/style/StylePureTable.css";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/filterTable";

type RadioParams = {
  שם?: string;
  ["שם משפחה"]?: string;
  עיר?: string;
  רחוב?: string;
  יחידה?: string;
  ["שם רכיב"]: string;
  id: string;
  מאזינים?: string | string[];
};

type IProps = {
  rows: RadioParams[];
  columns: string[];
};

const shortColumn = ["מושאל", "קוד הצפנה", "קידוד שמע", "תדר", "פורט", "adf"];
const NeedToBeNumberList = [
  "תפוסת דיסק",
  "צריכת זיכרון",
  "צריכת מעבד",
  "מספר פורט",
  "תדר",
];
const customProgressbar = ["תפוסת דיסק", "צריכת זיכרון", "צריכת מעבד"];

const ColumnWidthCalc = (title: string) => {
  let stringLength: number = title.length;
  if (stringLength < 8) return 80;
  else if (stringLength > 14) return stringLength * 8;
  else return stringLength * 10;
};

const ColumnTypeDecider = (title: string) => {
  if (NeedToBeNumberList.includes(title)) return "number";
  else return "string";
};

const ShowData = (data: any) => {
  console.log(data);
};
let count = 1;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton sx={{ direction: "rtl" }} />
      <GridToolbarDensitySelector sx={{ direction: "rtl" }} />
      <GridToolbarExport
        csvOptions={{
          fileName: "ויטלי מקמשים בעמ",
          utf8WithBom: true,
        }}
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
          allColumns: true,
          fileName: "ויטלי מקמשים בעמ",
        }}
      />
    </GridToolbarContainer>
  );
}
const PureTable = (props: IProps) => {
  // Filter the value of device-monitor
  const { items } = { items: useSelector((state: any) => state.filterTable) };
  const dispatch: any = useDispatch();

  const { rows, columns } = props;
  const [change, setChange] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);

  const editRows = rows.map((row) =>
    Object.assign(row, { id: row["שם רכיב"] })
  );

  const onFilterModelChange = (newFilterModel: any) => {
    if (change) {
      setTimeout(function () {
        setChange(0);
      }, 1000);
    } else {
      if (newFilterModel["items"].length) {
        const columnField = newFilterModel["items"][0]["columnField"];
        const operatorValue = newFilterModel["items"][0]["operatorValue"];
        const value = newFilterModel["items"][0]["value"];
        dispatch(setData({ columnField, operatorValue, value }));
      } else {
        const columnField = newFilterModel["items"];
        dispatch(setData({ columnField }));
      }
    }
  };

  const editColumns = columns.map((column: string) => ({
    field: column,
    headerName: column,
    headerAlign: "center" as const,
    align: "center" as const,
    width: shortColumn.includes(column) ? 50 : ColumnWidthCalc(column),
    type: ColumnTypeDecider(column),
    renderCell: (params: any) => (
      <Tooltip title={params.value ? params.value : "temp"}>
        {customProgressbar.includes(column) ? (
          renderProgress(params)
        ) : (
          <span>{params.value}</span>
        )}
      </Tooltip>
    ),
  }));

  return (
    <Box sx={{ height: 700 }}>
      <DataGrid
        disableVirtualization={true}
        localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
        density="compact"
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50, 100]}
        rows={editRows}
        columns={editColumns}
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{ columnsPanel: {} }}
        sx={{
          direction: "rtl",
          borderRadius: "8px",
        }}
        filterModel={items}
        onFilterModelChange={(newFilterModel) =>
          onFilterModelChange(newFilterModel)
        }
      />
    </Box>
  );
};
export default PureTable;
