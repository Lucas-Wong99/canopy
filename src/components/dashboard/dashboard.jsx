import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RightBar from "../rightBar/rightBar";
import LeftBar from "../leftBar/leftBar";
import Nav from "../nav/nav";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: "10px",
    height: "100vh"
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  }
}));

function Dashboard() {
  const classes = useStyles();

  const [statusCount, setStatusCount] = useState(0);

  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        {" "}
        {/*this holds all the page, and is the gradient background, holds the grid items*/}
        <Nav />
        <LeftBar statusCount={statusCount} />
        <RightBar setStatusCount={setStatusCount} />
      </Grid>
    </div>
  );
}

export default Dashboard;
