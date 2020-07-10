import React from "react";
import StatusFeed from "../statusFeed";
import CreateStatus from "../createStatus";
import AvatarDisplay from "../avatarDisplay";
import DailyData from "./dailyData";
import Toolbox from "../toolbox/toolbox";
import CustomizedProgressBars from "./waterData";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import googleSignin from "../google_btn";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: "10px",
    height: "100vh"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  status: {
    height: "400px",
    display: "flex",
    overflow: "auto"
  },
  dataVis: {
    height: "290px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  waterVis: {
    height: "400 px"
  },
  avatarDisplay: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Paper elevation={5} className={classes.paper}>
            Hello, Friend! Welcome to Canopy
            <button onClick={() => googleSignin()}>Google Signin</button>
          </Paper>
        </Grid>

        <Grid item className={classes.avatarDisplay}>
          <Paper className={classes.paper}>
            <AvatarDisplay />

            <CreateStatus />

            {/* Vines will go here */}

            <Toolbox />
          </Paper>
        </Grid>

        <Grid container className={classes.status}>
          <Paper className={classes.paper}>
            <Grid item xs={5}>
              <StatusFeed />
            </Grid>
            <Grid item className={classes.dataVis}>
              <DailyData />
              <CustomizedProgressBars />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
