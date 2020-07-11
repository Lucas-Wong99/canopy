import React from "react";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import googleSignin from "../google_btn";
import Checkin from "../checkins/morningCheckin"
import Checkout from "../checkins/checkout"
import RightBar from "../rightBar/rightBar"
import LeftBar from "../leftBar/leftBar"

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: "10px",
    height: "100vh",
  },
  brandBar: {
    height: "75px",
  },
  brandPaper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },

  leftBar: {
    height: "90%",
  },
 


}));

function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} className={classes.root}> {/*this holds all the page, and is the gradient background, holds the grid items*/}
        <Grid item xs={12} className={classes.brandBar}> {/* items are individual - xs = 12 says how far we want the grid to stretch in the container */}
          <Paper className={classes.brandPaper} elevation={5}> {/* Paper can give us our slight shadow, holds other things */}
            <img height="75px" src="/CanopyLogo.png" alt="Canopy Logo"/>
            <span className={classes.brandPaper}>
              <p>Hello, Friend! Welcome to Canopy</p>
              <button onClick={() => googleSignin()}>Google Signin</button>
            </span>
            <span className={classes.brandPaper}>
              <Checkin />
              <Checkout />
            </span>
          </Paper>
        </Grid> {/*  */}

        <LeftBar />
        {/* <Grid item xs={6} className={classes.avatarDisplay}>
          <Paper className={classes.paper} elevation={5}>
            <AvatarDisplay />

            <CreateStatus />

            <Vines className={classes.vines}/>

            <Toolbox />
          </Paper>
        </Grid> */}

        <RightBar />

      </Grid> {/* container */}
    </div>
  );
}

export default Dashboard;
