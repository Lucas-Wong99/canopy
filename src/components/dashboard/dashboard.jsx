import React from "react";
import StatusFeed from "../statusFeed";
import CreateStatus from "../createStatus";
import AvatarDisplay from "../avatarDisplay";
import DataVis from "./dataVis";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: "10px",
    height: "49vw",
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
  },
  avatarDisplay: {
    height: "773px",
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
            <Box className={classes.avatarDisplay}>
              <AvatarDisplay />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Box border={1}>
            <Paper className={classes.paper}>
              <Box>
                <CreateStatus />
              </Box>

              <Box className={classes.status} height="50%" overflow="auto">
                <StatusFeed />
              </Box>

              <Box className={classes.dataVis}>
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
