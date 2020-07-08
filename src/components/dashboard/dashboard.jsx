import React from "react";
import StatusFeed from "../statusFeed";
import CreateStatus from "../createStatus";
import AvatarDisplay from "../avatarDisplay";
import DailyData from "./dailyData";
import CustomizedProgressBars from "./waterData";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import googleSignin from "../google_btn";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: "10px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  status: {
    height: "400px",
  },
  dataVis: {
    height: "290px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  waterVis: {
    height: "400 px",
  },
  avatarDisplay: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
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

        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Box className={classes.avatarDisplay} border={1}>
              <AvatarDisplay />
            </Box>
            <Box>
              <CreateStatus />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Box border={1}>
            <Paper className={classes.paper}>
              <Box className={classes.status} overflow="auto">
                <StatusFeed />
              </Box>

              <Box className={classes.dataVis} border={1}>
                <DailyData />
              </Box>
              <Box className={classes.waterVis} border={1}>
                <CustomizedProgressBars />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
