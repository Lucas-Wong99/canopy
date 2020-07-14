import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RightBar from "../rightBar/rightBar";
import LeftBar from "../leftBar/leftBar";
import Nav from "../nav/nav";
import { functions } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #7CA982 30%, #0D4439 90%)",
    padding: "10px",
    height: "100vh",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
}));

function Dashboard() {
  const classes = useStyles();

  const [statusCount, setStatusCount] = useState(0);
  const [user, setUser] = useState("");

  const accessId = () => {
    const getUserId = functions.httpsCallable("getUserId");
    getUserId()
      .then((data) => {
        setUser(data.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    accessId();
  }, []);

  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        {" "}
        {/*this holds all the page, and is the gradient background, holds the grid items*/}
        <Nav user={user} />
        <LeftBar statusCount={statusCount} user={user} />
        <RightBar setStatusCount={setStatusCount} user={user} />
      </Grid>
    </div>
  );
}

export default Dashboard;
