// עמוד בקרת תצורה
import { styled } from "@mui/material/styles";
import {
  Box,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import React from "react";
import { Button, Card } from "react-bootstrap";
import deploy from "../images/imagesVersionView/deploy.png";
import script from "../images/imagesVersionView/script.png";
import software from "../images/imagesVersionView/software.png";
import study from "../images/imagesVersionView/study.png";
import { makeStyles } from "@mui/styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
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

const VersionViewer = (props: Props) => {
  const cardHeaderTitleStyle = useStyles();
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {Array.from(Array(4)).map((_, index) => (
          <Grid item xs={6} md={3}>
            <Item>
              <Card style={{ border: "none", boxShadow: "none"}}>
                <CardHeader
                  className={cardHeaderTitleStyle.title}
                  sx={{ margin: "0 auto", width: "50%" }}
                  title={cardHeadersTitle[index]}
                  subheader={cardHeadersSubHeader[index]}
                />
                <Box sx={{ margin: "0 auto" }}>
                  <img src={cardImages[index]} height={200} width={200} />
                </Box>
                <CardContent>
                  <Box sx={{ margin: "0 auto", width: "50%" }}>
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Box>
                  <Box sx={{display:"flex", justifyItems:"flex-end",flexDirection:"row-reverse", ml:5}}>
                    <IconButton size="large" sx={{color:"#f0bc5e"}}>
                      <FileDownloadIcon />
                    </IconButton>
                  </Box>
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
