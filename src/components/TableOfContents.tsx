import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import CCTAvatar from "../images/images-generalBlock/CCT2.png";
import RCGWAvatar from "../images/images-generalBlock/RCGW.png";
import YadbarAvatar from "../images/images-generalBlock/yadbar.png";
import DeployAvatar from "../images/images-generalBlock/deploy2.png";
import CCUAvatar from "../images/images-generalBlock/CCU.png";

const deviceToIcon = {
  CCT: CCTAvatar,
  RCGW: RCGWAvatar,
  Yadbar: YadbarAvatar,
  Deploy: DeployAvatar,
  CCU: CCUAvatar,
};

type Props = {};

const TableOfContents = (props: Props) => {
  // const items = [];
  // for (const [index, value] of deviceToIcon.entries()) {
  //   items.push(<Element key={index} />);
  // }

  return (
    <Card
      sx={{
        borderRadius: 3,
        backgroundColor: "#93B0B0",
        width: "600px",
        "& .MuiCardContent-root": {
          p: 1,
        },
      }}
    >
      <CardContent>
        <Box>
          <Grid container direction="row">
            {Object.entries(deviceToIcon).map((element) => {
              return (
                <Grid item xs={2} sx={{ mx: 1 }}>
                  <Grid container direction="row">
                    <Grid item xs={6}>
                      <Box>
                        <Avatar
                          sx={{}}
                          alt={element[0]}
                          src={element[1]}
                          variant="rounded"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1 }}>
                        <Typography
                          variant="subtitle2"
                          component="span"
                          color="white"
                        >
                          {element[0]}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TableOfContents;
