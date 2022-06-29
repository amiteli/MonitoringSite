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
const NeedToBeCheckboxList = [
  "הראה",
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
  console.log(data);
};

const PureTable = (props: IProps) => {
  const { rows, columns } = props;

  const [isChecked, setIsChecked] = useState(false);

  console.log(rows);
  console.log(columns);
  const [pageSize, setPageSize] = useState<number>(25);
  const [checked, setChecked] = useState<Array<boolean>>(
    rows.map((row) => row["הראה"] === "true")
  );

  const editRows = rows.map((row) =>
    Object.assign(row, { id: row["שם רכיב"] || row["id"] })
  );

  const handleChange = (params: any) => {
    const temp = [
      ...checked.slice(0, params.id),
      checked[params.id] === false,
      ...checked.slice(params.id + 1, checked.length),
    ];
    console.log(checked);
    setChecked(temp);
  };

  function cellElement(params: any, column: string) {
    console.log(params.id);
    if (customProgressbar.includes(column)) {
      return renderProgress(params);
    } else if (NeedToBeCheckboxList.includes(column)) {
      return (
        <Checkbox
          checked={checked[params.id]}
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
      <Tooltip title={params.value ? params.value : "temp"}>
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
