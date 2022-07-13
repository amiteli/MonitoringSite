import { Box, Checkbox, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useState } from "react";
import { renderProgress } from "./ProgressBarTableCell";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
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
  הראה: string;
};

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

const shortColumn = ["מושאל", "קוד הצפנה", "קידוד שמע", "תדר", "פורט", "adf"];
const NeedToBeNumberList = [
  "תפוסת דיסק",
  "צריכת זיכרון",
  "צריכת מעבד",
  "מספר פורט",
  "תדר",
];
const NeedToBeCheckboxList = [
  "הראה",
  "הראה1",
  "הראה2",
  "הראה3",
  "הראה במפה",
  "הראה בפינגר",
  "הראה במבט על",
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
  else if (NeedToBeCheckboxList.includes(title)) return "boolean";
  else return "string";
};

const ShowData = (data: any) => {
  // console.log(data);
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
    console.log(params);
    const temp2 = info;
    temp2[name][params.id][params.field] =
      temp2[name][params.id][params.field] === false;
    console.log(temp2);
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
    if (customProgressbar.includes(column)) {
      return renderProgress(params);
    } else if (NeedToBeCheckboxList.includes(column)) {
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
        density="compact"
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50, 100, 200]}
        rows={editRows}
        columns={editColumns}
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{ columnsPanel: {} }}
        sx={{
          borderRadius: "12px",
          boxShadow: 1,
        }}
        localeText={{
          //for change titles for Hebrew
          // columns panel
          toolbarColumns: "סינון עמודות",
          columnsPanelTextFieldLabel: "הכנס שם עמודה",
          columnsPanelTextFieldPlaceholder: "חיפוש לפי שם עמודה",
          columnsPanelShowAllButton: "הצג את כולם",
          columnsPanelHideAllButton: "בטל את כולם",
          // filters panel
          toolbarFilters: "סינון טקסט",
          filterPanelOperators: "סינון בעזרת",
          filterPanelColumns: "עמודה לסינון",
          filterPanelInputLabel: "ערך לסינון",
          filterPanelInputPlaceholder: "הכנס ערך",
          // Filter operators text
          filterOperatorContains: "מכיל",
          filterOperatorEquals: "שווה",
          filterOperatorStartsWith: "מתחיל ב",
          filterOperatorEndsWith: "מסתיים ב",
          filterOperatorIsEmpty: "תוכן ריק",
          filterOperatorIsNotEmpty: "תוכן לא ריק",
          filterOperatorIsAnyOf: "חלק מ",

          // density panel
          toolbarDensity: "צפיפות",
          toolbarDensityCompact: "קטן",
          toolbarDensityStandard: "רגיל",
          toolbarDensityComfortable: "גדול",

          // export panel
          toolbarExport: "ייצוא קובץ",
          toolbarExportCSV: "הורדת קובץ אקסל",
          toolbarExportPrint: "PDF הדפסת קובץ",

          // Column menu text
          columnMenuShowColumns: "סינון עמודות",
          columnMenuFilter: "סינון טקסט",
          columnMenuHideColumn: "הסתר",
          columnMenuUnsort: "ביטול מיון",
          columnMenuSortAsc: "מיון לפי א-ב",
          columnMenuSortDesc: "מיון מילון הפוך",
        }}
      />
    </Box>
  );
};
export default PureTable;
