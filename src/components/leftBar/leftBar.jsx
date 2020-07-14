import React from "react";
import AvatarDisplay from "./avatarDisplay";
import Toolbox from "./toolbox/toolbox";
import Vines from "./vines";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatarDisplay: {
    height: "90%",
    zIndex: 2,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    zIndex: 2,
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between"
  }
}));

export default function LeftBar({ statusCount, user }) {
  const classes = useStyles();

  return (
    <Grid item xs={6} className={classes.avatarDisplay}>
      <Paper className={classes.paper} elevation={5}>
        <AvatarDisplay currentUser={user} className={classes.avatarDisplay} />

        <Vines className={classes.vines} statusCount={statusCount} />

        <Toolbox className={classes.avatarDisplay} />
      </Paper>
    </Grid>
  );
}
