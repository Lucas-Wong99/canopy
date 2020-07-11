import React from "react";
import CreateStatus from "./createStatus";
import AvatarDisplay from "./avatarDisplay";
import Toolbox from "./toolbox/toolbox";
import Vines from "./vines";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatarDisplay: {
    height: "90%"
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  },
  vines: {
    position: "absolute",
    top: "150px",
    left: "10px"
  }
}));

export default function LeftBar({ statusCount }) {
  const classes = useStyles();

  return (
    <Grid item xs={6} className={classes.avatarDisplay}>
      <Paper className={classes.paper} elevation={5}>
        <AvatarDisplay />

        <CreateStatus />

        <Vines className={classes.vines} statusCount={statusCount} />

        <Toolbox />
      </Paper>
    </Grid>
  );
}
