import React from "react";
// import { Grid, Box } from "grommet";
import StatusFeed from "../statusFeed";
import { googleSignin } from "../google_btn";
import CreateStatus from "../createStatus";
import AvatarDisplay from "../avatarDisplay";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Hello, Friend! Welcome to Canopy
            <button>googleSignin</button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <AvatarDisplay />
        </Grid>
        <Grid item xs={6}>
          <CreateStatus />
          <StatusFeed />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
