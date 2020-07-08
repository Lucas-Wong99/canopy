import React from "react";
import StatusFeed from "../statusFeed";
import CreateStatus from "../createStatus";
import AvatarDisplay from "../avatarDisplay";
import DataVis from "./dataVis";
import { Grid, Paper, Box, height } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: "10px",
    height: "90vw",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  status: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    height: "500px",
  },
  dataVis: {
    height: "200px",
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={5} className={classes.paper}>
            Hello, Friend! Welcome to Canopy
            <button>googleSignin</button>
          </Paper>
        </Grid>

        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <AvatarDisplay />
          </Paper>
        </Grid>

        <Grid item xs={5} maxHeight="100%">
          <Box border={1}>
            <Paper className={classes.paper} height="100%">
              <Box height="25%" border={4} overflow="auto">
                <CreateStatus />
              </Box>

              <Box
                className={classes.status}
                height="50%"
                border={4}
                overflow="auto"
              >
                <StatusFeed />
              </Box>

              <Box height="25%" border={4} overflow="hidden">
                <DataVis />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
