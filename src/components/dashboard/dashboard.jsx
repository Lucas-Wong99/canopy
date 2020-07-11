import React from "react";
import StatusFeed from "../statusFeed";
import CreateStatus from "../createStatus";
import AvatarDisplay from "../avatarDisplay";
import DailyDataVis from "./dailyData";
import WeeklyDataVis from "./weeklyData";
import Toolbox from "../toolbox/toolbox";
import Vines from "../vines";
import CustomizedProgressBars from "./waterData";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import googleSignin from "../google_btn";
import Checkin from "../checkins/morningCheckin"
import Checkout from "../checkins/checkout"

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: "10px",
    height: "100vh",
  },
  brandBar: {
    height: "75px",
  },
  brandPaper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
  avatarDisplay: {
    height: "90%",
  },
  leftBar: {
    height: "90%",
  },
  status: {
    overflow: "auto",
    height: "50%",
  },
  dataVis: {
    display: "flex",
    justifyContent: "center",
  },
  waterVis: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  vines: {
    position: "absolute",
    top: "150px",
    left: "10px"
  }
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} className={classes.brandBar}>
          <Paper className={classes.brandPaper} elevation={5}>
            <img height="75px" src="/CanopyLogo.png" alt="Canopy Logo"/>
            <span className={classes.brandPaper}>
              <p>Hello, Friend! Welcome to Canopy</p>
              <button onClick={() => googleSignin()}>Google Signin</button>
            </span>
            <span className={classes.brandPaper}>
              <Checkin />
              <Checkout />
            </span>
          </Paper>
        </Grid>

        <Grid item xs={6} className={classes.avatarDisplay}>
          <Paper className={classes.paper} elevation={5}>
            <AvatarDisplay />

            <CreateStatus />

            <Vines className={classes.vines}/>

            <Toolbox />
          </Paper>
        </Grid>

        <Grid item xs={6} className={classes.leftBar}>
          <Paper className={classes.paper} elevation={5}>
            <Box className={classes.status}>
              <StatusFeed />
            </Box>
            <Box className={classes.dataVis}>
              <DailyDataVis />
              <WeeklyDataVis />
            </Box>
            <Box className={classes.waterVis}>
              <h1> Daily Water intake</h1>
              <CustomizedProgressBars />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
