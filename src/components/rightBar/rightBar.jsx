import React, { useEffect, useState } from "react";
import StatusFeed from "../statusFeed";
import DailyDataVis from "./data/dailyData";
import WeeklyDataVis from "./data/weeklyData";
import CustomizedProgressBars from "./data/waterData";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { functions } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  dataVis: {
    display: "flex",
    justifyContent: "center"
  },
  waterVis: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  rightPaper: {
    height: "48%"
  },
  rightBar: {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  status: {
    overflow: "auto",
    height: "100%"
  }
}));

export default function RightBar() {
  const classes = useStyles();

  const [user, setUser] = useState("");

  const accessId = () => {
    const getUserId = functions.httpsCallable("getUserId");
    getUserId()
      .then((data) => {
        setUser(data.data.userId);
        // return data.data.userId;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    accessId();
  }, []);

  return (
    <Grid item xs={6} className={classes.rightBar}>
      <Paper className={classes.rightPaper} elevation={5}>
        <Box className={classes.status}>
          <StatusFeed />
        </Box>
      </Paper>

      <Paper className={classes.rightPaper} elevation={5}>
        <Box className={classes.dataVis}>
          <DailyDataVis user={user} />
          <WeeklyDataVis user={user} />
        </Box>
        <Box className={classes.waterVis}>
          <h1> Daily Water intake</h1>
          <CustomizedProgressBars />
        </Box>
      </Paper>
    </Grid>
  );
}
