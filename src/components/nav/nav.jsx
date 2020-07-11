import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import googleSignin from "./google_btn";
import Checkin from "./checkins/morningCheckin"
import Checkout from "./checkins/checkout"

const useStyles = makeStyles((theme) => ({

  brandBar: {
    height: "75px",
  },
  brandPaper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
}))


export default function Nav() {
  const classes = useStyles();

  return (
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
  </Grid> 

  )
}