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

type IProps = {
  // rows: RadioParams[];
  columns: string[];
  info: any;
  setInfo: any;
  name: string;
};
type checked = {
  הראה1: Array<boolean>;
  הראה2: Array<boolean>;
  הראה3: Array<boolean>;
};

const NeedToBeCheckboxList = [
  "הראה",
  "הראה1",
  "הראה2",
  "הראה3",
  "הראה במפה",
  "הראה בפינגר",
  "הראה במבט על",
];

const shortColumn = ["מושאל", "קוד הצפנה", "קידוד שמע", "תדר", "פורט", "adf"];

const ColumnWidthCalc = (title: string) => {
  let stringLength: number = title.length;
  if (stringLength < 8) return 80;
  else if (stringLength > 14) return stringLength * 8;
  else return stringLength * 10;
};

const ColumnTypeDecider = (title: string) => {
  if (NeedToBeCheckboxList.includes(title)) return "boolean";
  else return "string";
};

const PureTable = (props: IProps) => {
  const { columns, info, setInfo, name } = props;

  const rows = info[name];

  // console.log(rows);
  // console.log(columns);
  const [pageSize, setPageSize] = useState<number>(25);

  const [checked, setChecked] = useState<checked>({
    הראה1: rows.map((row: any) => row["הראה1"] === true),
    הראה2: rows.map((row: any) => row["הראה2"] === true),
    הראה3: rows.map((row: any) => row["הראה3"] === true),
  });

  const editRows = rows.map((row: any) =>
    Object.assign(row, { id: row["שם רכיב"] || row["id"] })
  );

  const handleChange = (params: any) => {
    // console.log(params);
    const temp2 = info;
    temp2[name][params.id][params.field] =
      temp2[name][params.id][params.field] === false;
    // console.log(temp2);
    setInfo(temp2);
    setChecked({
      הראה1: rows.map((row: any) => row["הראה1"] === true),
      הראה2: rows.map((row: any) => row["הראה2"] === true),
      הראה3: rows.map((row: any) => row["הראה3"] === true),
    });
  };

  function cellElement(params: any, column: string) {
    // console.log(params.field);
    // const field: string = params.field;
    // console.log(params.id);
    if (NeedToBeCheckboxList.includes(column)) {
      return (
        <Checkbox
          checked={checked[params.field][params.id]}
          onChange={() => handleChange(params)}
        />
      );
    } else {
      return <span>{params.value}</span>;
    }
  }

  const editColumns = columns.map((column: string) => ({
    field: column,
    headerName: column,
    headerAlign: "center" as const,
    align: "center" as const,
    width: shortColumn.includes(column) ? 50 : ColumnWidthCalc(column),
    type: ColumnTypeDecider(column),
    renderCell: (params: any) => (
      <Tooltip
        title={
          params.value && typeof params.value != "boolean" ? params.value : ""
        }
      >
        {cellElement(params, column)}
      </Tooltip>
    ),
  }));

  return (
    // <div>
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
        componentsProps={{ columnsPanel: {} }}
        sx={{
          direction: "rtl",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};
export default PureTable;
