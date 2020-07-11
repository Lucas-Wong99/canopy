import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: "50px",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    width: "450px",
  },
  bar: {
    borderRadius: 5,
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    height: "50px",
    // display: "flex",
    // justifyContent: "center",
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    // flexGrow: 1,
  },
});

export default function CustomizedProgressBars() {
  const classes = useStyles();

  return (
    <Grid item className={classes.root}>
      <BorderLinearProgress
        variant="determinate"
        value={50}
        valueBuffer={100}
      />
    </Grid>
  );
}
