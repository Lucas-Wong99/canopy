import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import googleSignin from "./google_btn";
import Checkin from "./checkins/morningCheckin";
import Checkout from "./checkins/checkout";
import LandingPage from "./landingPage";

const useStyles = makeStyles((theme) => ({
  brandBar: {
    height: "85px"
  },
  brandPaper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  welcome: {
    textAlign: "center"
  },

  buttons: {
    display: "flex",
    alignItems: "center",
    width: "350px"
  }
}));

export default function Nav({ user, setCheckinData, checkinData }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.brandBar}>
      {" "}
      {/* items are individual - xs = 12 says how far we want the grid to stretch in the container */}
      <Paper className={classes.brandPaper} elevation={5}>
        {" "}
        {/* Paper can give us our slight shadow, holds other things */}
        <img height="75px" src="/CanopyLogo.png" alt="Canopy Logo" />
        <span className={classes.welcome}>
          <Typography component={"span"}>
            Hello, {user}!<br></br>Welcome To The Canopy
          </Typography>
          {/* <button onClick={() => googleSignin()}>Google Signin</button> */}
        </span>
        <span className={classes.buttons}>
          <LandingPage />
          <Checkin setCheckinData={setCheckinData} checkinData={checkinData} />
          <Checkout />
        </span>
      </Paper>
    </Grid>
  );
}
