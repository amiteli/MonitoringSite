// עמוד נתוני משתמש
import React from "react";
import {
  Box,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { styled } from "@mui/material/styles";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Card } from "react-bootstrap";
import All from "../images/imagesUserInfo/All.png";
import TakashServers from "../images/imagesUserInfo/TakashServers.png";
import Kronot from "../images/imagesUserInfo/Kronot.png";
import Hamalim from "../images/imagesUserInfo/Hamalim.png";
import Other from "../images/imagesUserInfo/Other.png";
import Radio from "../images/imagesUserInfo/Radio.png";
import Chativa from "../images/imagesUserInfo/Chativa.png";
import Platformot from "../images/imagesUserInfo/Platformot.png";
import Divider from "@mui/material/Divider";
interface IProps {}

const cardHeadersTitle: Array<string> = [
  'תק"שי שרתים',
  "קרונות",
  'תק"שי רדיו',
  'תק"שי חטיבה',
  "פלטפורמות",
  "חמלים",
  "אחרים",
  "הכל",
];

const cardImages = [
  All,
  TakashServers,
  Kronot,
  Hamalim,
  Other,
  Radio,
  Chativa,
  Platformot,
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: "35vh",
}));

const FlipComponent = ({ index }: { index: number }) => {
  const [isFlipped, changeFlip] = useState(false);
  const handleClick = (event: any) => {
    event.preventDefault();
    changeFlip(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div key="front" onClick={handleClick} style={{ cursor: "pointer" }}>
        <div>
          <Card
            style={{
              border: "none",
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
          >
            <Divider sx={{ fontSize: 18, fontWeight: "bold", pb: 2, pt: 2 }}>
              {cardHeadersTitle[index]}
            </Divider>
            <Box
              sx={{
                margin: "0 auto",
              }}
            >
              <img
                src={cardImages[index]}
                height={150}
                width={150}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              />
            </Box>
            <CardContent>
              <Box sx={{ margin: "0 auto", width: "70%" }}>
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      <div key="back">
        <div>
          <Card
            style={{
              border: "none",
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
          >
            <Divider sx={{ fontSize: 18, fontWeight: "bold", pb: 2, pt: 2 }}>
              סמן סינון על פי קטגוריות:
            </Divider>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ display: "flex" }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="הראה בפינגר"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="הראה במבט על"
                  />
                  <FormControlLabel control={<Checkbox />} label="הראה במפה" />
                </FormGroup>
                <FormGroup sx={{ display: "grid", columns: 2 }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="הראה 1"
                  />
                  <FormControlLabel control={<Checkbox />} label="הראה 2" />
                  <FormControlLabel control={<Checkbox />} label="הראה 3" />
                </FormGroup>
              </Box>
            </CardContent>
          </Card>
          <IconButton onClick={handleClick} sx={{mt:6,mb:5}}>
            <ArrowBackIosOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </ReactCardFlip>
  );
};
const UserInfo = (props: IProps) => {

  const [isFlipped, setIsFlipped] = useState(false);




  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Array.from(Array(8)).map((_, index) => (
            <Grid item xs={3} md={3}>
              <Item>
                <FlipComponent key={index} index={index} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default UserInfo;

// const info = {
//   TakashServer: [
//     {
//       id: "0",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: true,
//       הראה3: true,
//     },
//     {
//       id: "1",
//       שם: "qwer",
//       מספר: "258",
//       הראה1: true,
//       הראה2: true,
//       הראה3: false,
//     },
//     {
//       id: "2",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: false,
//       הראה3: true,
//     },
//   ],
//   Kronot: [
//     {
//       id: "0",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: true,
//       הראה3: true,
//     },
//     {
//       id: "1",
//       שם: "qwer",
//       מספר: "258",
//       הראה1: true,
//       הראה2: true,
//       הראה3: false,
//     },
//     {
//       id: "2",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: false,
//       הראה3: true,
//     },
//   ],
//   Platform: [
//     {
//       id: "0",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: true,
//       הראה3: true,
//     },
//     {
//       id: "1",
//       שם: "qwer",
//       מספר: "258",
//       הראה1: true,
//       הראה2: true,
//       הראה3: false,
//     },
//     {
//       id: "2",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: false,
//       הראה3: true,
//     },
//   ],
//   Hamalim: [
//     {
//       id: "0",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: true,
//       הראה3: true,
//     },
//     {
//       id: "1",
//       שם: "qwer",
//       מספר: "258",
//       הראה1: true,
//       הראה2: true,
//       הראה3: false,
//     },
//     {
//       id: "2",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: false,
//       הראה3: true,
//     },
//   ],
//   Other: [
//     {
//       id: "0",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: true,
//       הראה3: true,
//     },
//     {
//       id: "1",
//       שם: "qwer",
//       מספר: "258",
//       הראה1: true,
//       הראה2: true,
//       הראה3: false,
//     },
//     {
//       id: "2",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: false,
//       הראה3: true,
//     },
//   ],
//   All: [
//     {
//       id: "0",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: true,
//       הראה3: true,
//     },
//     {
//       id: "1",
//       שם: "qwer",
//       מספר: "258",
//       הראה1: true,
//       הראה2: true,
//       הראה3: false,
//     },
//     {
//       id: "2",
//       שם: "zxcv",
//       מספר: "369",
//       הראה1: false,
//       הראה2: false,
//       הראה3: true,
//     },
//   ],
// };
// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }
// const [value, setValue] = React.useState(0);
// const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//   setValue(newValue);
// };
// const handleClick = () => {
//   setIsFlipped(!isFlipped);
// };
// const header = ["id", "שם", "מספר", "הראה1", "הראה2", "הראה3"];
{
  /* <Paper sx={{ bgcolor: "#f3f3f3", width:"94vw" }}>
          <Box sx={{ width: "100%", borderRadius: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                dir="rtl"
                centered
              >
                {/* {generalTabList &&
                  generalTabList.map((name, index) => {
                    <Tab label={name} {...a11yProps(index)} />;
                  })} */
}
//           <Tab
//             label='תק"שי שרתים'
//             {...a11yProps(0)}
//             sx={{ marginLeft: 3, marginRight: 3 }}
//           />
//           <Tab
//             label="קרונות"
//             {...a11yProps(1)}
//             sx={{ marginLeft: 3, marginRight: 3 }}
//           />
//           <Tab
//             label='תק"שי רדיו'
//             {...a11yProps(2)}
//             sx={{ marginLeft: 3, marginRight: 3 }}
//           />
//           <Tab
//             label='תק"שי חטיבה'
//             {...a11yProps(3)}
//             sx={{ marginLeft: 3, marginRight: 3 }}
//           />
//           <Tab
//             label="פלטפורמות"
//             {...a11yProps(4)}
//             sx={{ marginLeft: 3, marginRight: 3 }}
//           />
//           <Tab
//             label="חמלים"
//             {...a11yProps(5)}
//             sx={{ marginLeft: 3, marginRight: 3 }}
//           />
//           <Tab
//             label="אחרים"
//             {...a11yProps(6)}
//             sx={{ marginLeft: 3, marginRight: 3 }}
//           />
//           <Tab
//             label="הכל"
//             {...a11yProps(7)}
//             sx={{ marginLeft: 3, marginRight: 3 }}
//           />
//         </Tabs>
//       </Box>
//       <Box dir="rtl">
//         {generalMachineTabList &&
//           generalMachineTabList.map((name, index) => {
//             return (
//               <TabPanel value={value} index={index}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>
//                     <Box>
//                       <UserControllerTable
//                         columns={header}
//                         info={info}
//                         setInfo={setInfo}
//                         name={name}
//                       />
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </TabPanel>
//             );
//           })}
//       </Box>
//     </Box>
// </Paper> */}
