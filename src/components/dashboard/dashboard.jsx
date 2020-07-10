import React from "react";
import StatusFeed from "../statusFeed";
import CreateStatus from "../createStatus";
import AvatarDisplay from "../avatarDisplay";
import DailyData from "./dailyData";
import Toolbox from "../toolbox/toolbox";
import Vines from "../vines"
import CustomizedProgressBars from "./waterData";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import googleSignin from "../google_btn";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: "10px",
    height: "100vh",
  },
  brandBar: {
    height: "75px",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
  status: {
    overflow: "auto",
    height: "50%",
  },
  dataVis: {
    height: "90%",
  },
  waterVis: {
    height: "100px",
  },
  avatarDisplay: {
    height: "90%",
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} className={classes.brandBar}>
          <Paper className={classes.paper} elevation={5}>
            Hello, Friend! Welcome to Canopy
            <button onClick={() => googleSignin()}>Google Signin</button>
          </Paper>
        </Grid>

        <Grid item xs={6} className={classes.avatarDisplay}>
          <Paper className={classes.paper} elevation={5}>
            <AvatarDisplay />

            <CreateStatus />

            <Vines />

            <Toolbox />
          </Paper>
        </Grid>

        <Grid item xs={6} className={classes.dataVis}>
          <Paper className={classes.paper} elevation={5}>
            <Box className={classes.status}>
              <StatusFeed />
            </Box>
            <Box className={classes.waterVis}>
              <DailyData />
              <CustomizedProgressBars />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
