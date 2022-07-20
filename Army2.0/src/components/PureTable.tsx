import { Box, Checkbox, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  heIL,
  GridFilterModel,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useState } from "react";
import { renderProgress } from "./ProgressBarTableCell";
import "../components/style/StylePureTable.css";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { render } from "react-dom";
import { clear } from "console";
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
      <GridToolbarQuickFilter debounceMs={500}/>
    </GridToolbarContainer>
  );
}
const PureTable = (props: IProps) => {
  // Filter the value of device-monitor
  let { items } = useSelector((state: any) => state.filterTable);

  // const dispatch: any = useDispatch();
  const [filterModel, setFilterModel] = React.useState<any>({
    items: [items[0]]
  });
  // const handleChange = (newFilter:any) => {
  //   if(count == 0){
  //     setFilterModel(filterModel)
  //   }
  //   // setFilterModel(newFilter);
  // }
  console.log(items)
  console.log(filterModel);

  // const handleChange = (newFilterModel: any) => {
  //   const columnField = newFilterModel.items.columnField;
  //   const value = newFilterModel.items ? newFilterModel.items.value : undefined
  //   const items = newFilterModel.items
  //   // setFilterModel(useSelector((state: any) => state.filterTable))
  // }

  const { rows, columns } = props;
  const [pageSize, setPageSize] = useState<number>(25);

  const editRows = rows.map((row) =>
    Object.assign(row, { id: row["שם רכיב"] })
  );

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
        filterModel={filterModel}
        onFilterModelChange={(newFilter) => setFilterModel(newFilter)}
      />
    </Box>
  );
};
export default PureTable;
