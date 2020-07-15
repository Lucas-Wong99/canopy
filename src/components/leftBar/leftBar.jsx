import React from "react";
import AvatarDisplay from "./avatarDisplay";
import Toolbox from "./toolbox/toolbox";
import Vines from "./vines";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  leftbar: {
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  avatars: {
    color: theme.palette.text.secondary,
    height: "23%",
    zIndex: 2,
    color: "black",
    paddingLeft: "10px",
    overflow: "auto"
  },
  pomodoro: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "75%",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
}));

export default function LeftBar({ statusCount, user, checkinData }) {
  const classes = useStyles();

  return (
    <Grid item xs={6} className={classes.leftbar}>
      <Paper className={classes.avatars} elevation={5}>
        <Typography component={"span"}>Canopy Staff</Typography>
        <AvatarDisplay currentUser={user} className={classes.avatarDisplay} />
      </Paper>
      <Paper className={classes.pomodoro} elevation={5}>
        <Vines className={classes.vines} statusCount={statusCount} />

        <Toolbox checkinData={checkinData} />
      </Paper>
    </Grid>
  );
}
