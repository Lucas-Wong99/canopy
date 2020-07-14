import React from "react";
import Pomodoro from "./pomodoro";
import WaterButton from "./water_btn";
import StretchButton from "./stretch_btn";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 2,
    height: "45%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "50px"
    
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    zIndex: 2,
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between"
  },
  trackers: {
    display: "flex",
    justifyContent: "space-between",
    width: "50%"
  }
}));


function Toolbox() {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Pomodoro />
      <span className={classes.trackers}>
        <WaterButton />
        <StretchButton  />
      </span>
    </Grid>
  );
}

export default Toolbox;
