import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box, width } from "@mui/system";
import React from "react";
import { IconBase } from "react-icons";

type Props = {};

const About = (props: Props) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <Grid item xs={3}>
        <Card>
          <Card sx={{ width: "500px" }}>
            <CardMedia
              component="img"
              height="140"
              image="src\images\about-card-image.png"
              alt="about us"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                align="center"
                color="info.main"
              >
                אודות המערכת
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  גירסת המערכת: 2.0.0
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="right"
                fontSize="15px"
              >
                לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית ליבם סולגק.
                בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה -
                לתכי מורגם בורק? לתיג ישבעס. להאמית קרהשק סכעיט דז מא, מנכם
                למטכין נשואי מנורך. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי
                מנורךגולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ,
                ושבעגט. קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם
                איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי
                נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס
                אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קוואזי במר
                מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף
                לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו
                ננבי, צמוקו בלוקריה שיצמה ברורק. נולום ארווס סאפיאן - פוסיליס
                קוויס, אקווזמן גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק
                ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש.
                תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.
              </Typography>
              <Typography
                variant="subtitle1"
                color="info.main"
                align="right"
                marginTop={5}
              >
                אנשי קשר:
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  fontSize="16px"
                >
                  דייויד 050-852-7845 <br />
                  מנחם 050-852-7845 <br />
                  עמית 050-852-7845 <br />
                  <br />
                </Typography>
              </Typography>
              <Tooltip
                disableInteractive
                TransitionProps={{ timeout: 600 }}
                title='ענף מרו"ם מחלקת לי"ד'
              >
                <Typography
                  variant="subtitle2"
                  color="primary.main"
                  align="center"
                  sx={{ cursor: "pointer" }}
                >
                  המערכת פותחה על ידי צוות פיתוח מדור מערכות לומ"ר
                </Typography>
              </Tooltip>
            </CardContent>
          </Card>
        </Card>
      </Grid>
    </Grid>
  );
};

export default About;
