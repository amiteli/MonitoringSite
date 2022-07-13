import { Typography } from "@mui/material";
import React from "react";

interface IProps {
  name: string;
}

const InfoText = (props: IProps) => {
  const { name } = props;
  return (
    <>
      <Typography
        component="h3"
        variant="h3"
        sx={{ fontWeight: 700, fontSize: 21 }}
      >
        מסך {name}
      </Typography>
      <Typography
        component="h5"
        variant="h5"
        sx={{ fontWeight: 300, fontSize: 21 }}
      >
        צגת ניטור עבור כלל ה{name} המחוברים ומוגדרים בקובץ הפק''ל כולל ניתוח
        סטאטוס
      </Typography>
    </>
  );
};

export default InfoText;
