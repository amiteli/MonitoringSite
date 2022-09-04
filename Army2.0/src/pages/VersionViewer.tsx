// עמוד בקרת תצורה
import React from "react";
import {
  Box,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Card } from "react-bootstrap";
import deploy from "../images/imagesVersionView/deploy.png";
import script from "../images/imagesVersionView/script.png";
import software from "../images/imagesVersionView/software.png";
import study from "../images/imagesVersionView/study.png";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
type Props = {};

const useStyles = makeStyles({
  title: {
    color: "#f0bc5e",
    "& .MuiCardHeader-title": {
      fontWeight: "bold",
      fontSize: 26,
      letterSpacing: "0.7px",
    },
  },
});

const MyButton = styled(Button)({
  border: "1px solid #2e3b55",
  borderRadius: 6,
  color: "black",
  height: 36,
  padding: "0 25px",
  "&:hover": {
    color: "#f0bc5e",
    backgroundColor: "#2e3b55",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));
// const onDownload = () => {
//   const link = document.createElement("a");
//   link.download = `a.bat`;
//   link.href = "/src/a.bat";
//   link.click();
// };
// const file = new File(['ipconfig\n pause'], 'vnc.bat', {
//   type: 'bat',
// })
// function download() {
//   const link = document.createElement('a')
//   const url = URL.createObjectURL(file)

//   link.href = url
//   link.download = file.name
//   document.body.appendChild(link)
//   link.click()

//   document.body.removeChild(link)
//   window.URL.revokeObjectURL(url)
// }
const cardHeadersTitle = [
  "סקריפט תפעול",
  "תוכנות עבודה",
  "מאגר למידה",
  "שירותי הפצה",
];
const cardHeadersSubHeader = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tenetur at accusamus ad, nam illo deleniti aliquid sint perferendis! Accusamus.",

  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tenetur at accusamus ad, nam illo deleniti aliquid sint perferendis! Accusamus.",

  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tenetur at accusamus ad, nam illo deleniti aliquid sint perferendis! Accusamus.",

  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tenetur at accusamus ad, nam illo deleniti aliquid sint perferendis! Accusamus.",
];
const cardImages = [script, software, study, deploy];

const toggleTitles = {
  title: ["סקריפטים להורדה", "תוכנות להורדה", "סרטונים לצפיה", "שירותים"],
  detail: [
    [
      <MyButton>
        <div style={{ marginLeft: 5 }}>סקריפט 1</div>
        <FileDownloadOutlinedIcon />
      </MyButton>,
      <MyButton>
        <div style={{ marginLeft: 5 }}>סקריפט 2</div>
        <FileDownloadOutlinedIcon />
      </MyButton>,
      <MyButton>
        <div style={{ marginLeft: 5 }}>סקריפט 3</div>
        <FileDownloadOutlinedIcon />
      </MyButton>,
    ],
    [
      <MyButton>
        <div style={{ marginLeft: 5 }}>תוכנה 1</div>
        <FileDownloadOutlinedIcon />
      </MyButton>,
      <MyButton>
        <div style={{ marginLeft: 5 }}>תוכנה 2</div>
        <FileDownloadOutlinedIcon />
      </MyButton>,
      <MyButton>
        <div style={{ marginLeft: 5 }}>תוכנה 3</div>
        <FileDownloadOutlinedIcon />
      </MyButton>,
    ],
    [
      <MyButton>
        <div style={{ marginLeft: 5 }}>סרטון 1</div>
        <PlayCircleOutlinedIcon />
      </MyButton>,
      <MyButton>
        <div style={{ marginLeft: 5 }}>סרטון 2</div>
        <PlayCircleOutlinedIcon />
      </MyButton>,
      <MyButton>
        <div style={{ marginLeft: 5 }}>סרטון 3</div>
        <PlayCircleOutlinedIcon />
      </MyButton>,
    ],
    [
      <MyButton>
        <div style={{ marginLeft: 5 }}>שירות 1</div>
        <FileDownloadOutlinedIcon />
      </MyButton>,
      <MyButton>
        <div style={{ marginLeft: 5 }}>שירות 2</div>
        <FileDownloadOutlinedIcon />
      </MyButton>,
      <MyButton>
        <div style={{ marginLeft: 5 }}>שירות 3</div>
        <FileDownloadOutlinedIcon />
      </MyButton>,
    ],
  ],
};

const VersionViewer = (props: Props) => {
  const styleCardHeader = useStyles();
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {Array.from(Array(4)).map((_, index) => (
          <Grid item xs={6} md={6}>
            <Item>
              <Card
                style={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
              >
                <Divider
                  sx={{
                    fontSize: 22,
                    color: "#f0bc5e",
                    fontWeight: "bold",
                    pb: 2,
                    pt: 2,
                    letterSpacing: "0.7px",
                  }}
                >
                  {cardHeadersTitle[index]}
                </Divider>
                <Box sx={{ margin: "0 auto" }}>
                  <img src={cardImages[index]} height={150} width={150} />
                </Box>
                <CardContent>
                  <Box sx={{ margin: "0 auto", width: "70%" }}>
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Box>
                  <div
                    style={{ width: "60%", margin: "0 auto", marginTop: 20 }}
                  >
                    <Accordion sx={{ backgroundColor: "#f0bc5e" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon htmlColor="black" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography fontWeight={"bold"} color={"black"}>
                          {toggleTitles.title[index]}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {toggleTitles.detail[index]}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default VersionViewer;
