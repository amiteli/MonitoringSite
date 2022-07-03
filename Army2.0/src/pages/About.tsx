import {
    Card,
    CardContent,
    CardMedia,
    Divider,
    Tooltip,
    Typography,
  } from "@mui/material";
  import PhoneIcon from "@mui/icons-material/Phone";
  import CopyrightIcon from "@mui/icons-material/Copyright";
  import Grid from "@mui/material/Grid";
  import { bgcolor, Box, padding } from "@mui/system";
  
  type Props = {};
  
  const About = (props: Props) => {
    return (
      <Grid container spacing={0} direction="column" alignItems="center">
        <Grid item xs={3}>
          <Card>
            <Card sx={{ width: "500px" }}>
              <CardMedia
                component="img"
                height="170"
                image="src\images\about-card-image.png"
                alt="about us"
              />
              <CardContent sx={{ p: 3 }}>
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
                  align="justify"
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
                <Card elevation={0} sx={{ mb: 4, mt: 3 }}>
                  <CardMedia sx={{ bgcolor: "info.main", padding: "2px" }}>
                    <Typography
                      variant="subtitle1"
                      color="white"
                      align="center"
                      fontWeight="medium"
                    >
                      אנשי קשר
                      <PhoneIcon fontSize="small" />
                    </Typography>
                  </CardMedia>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontSize="16px"
                    bgcolor="rgba(0, 0, 0, 0.04)"
                    textAlign="center"
                    p="8px"
                  >
                    <Tooltip disableInteractive title="דייויד" followCursor>
                      <Typography> דייויד 050-852-7845</Typography>
                    </Tooltip>
                    <Tooltip disableInteractive title="מנחם" followCursor>
                      <Typography> מנחם 050-852-7845</Typography>
                    </Tooltip>
                    <Tooltip disableInteractive title="עמית" followCursor>
                      <Typography> עמית 050-852-7845</Typography>
                    </Tooltip>
                  </Typography>
                </Card>
  
                <Divider variant="middle" sx={{ marginBottom: 1 }} />
                
                <Tooltip
                  disableInteractive
                  TransitionProps={{ timeout: 600 }}
                  title='ענף מרו"ם מחלקת לי"ד'
                >
                  <Typography
                    variant="subtitle2"
                    color="primary.main"
                    align="center"
                    pt="3px"
                    sx={{ cursor: "pointer" }}
                  >
                    <CopyrightIcon fontSize="small" sx={{ marginLeft: "3px" }} />
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