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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton sx={{direction:"rtl"}}/>
      <GridToolbarDensitySelector sx={{direction:"rtl"}}/>
      <GridToolbarExport
        csvOptions={{
          fileName: "ויטלי מקמשים בעמ",
          utf8WithBom: true,
        }}
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
          // allColumns: true,
          fileName: "ויטלי מקמשים בעמ",
        }}
      />
    </GridToolbarContainer>
  );
}

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

const EliavColumnsPanel = () => {
  return (
    <>
      <Checkbox checked />
    </>
  );
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

const PureTable = (props: IProps) => {
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
    // <div>
    <Box sx={{ height: 700}}>
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
          direction:"rtl",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};
export default PureTable;
