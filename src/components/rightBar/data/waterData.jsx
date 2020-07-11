import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { db } from "../../../firebase";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: "50px",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    width: "450px",
  },
  bar: {
    borderRadius: 5,
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    height: "50px",
    // display: "flex",
    // justifyContent: "center",
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    // flexGrow: 1,
  },
});
const MAX = 8;
const MIN = 0;
function normalize(value) {
  let cups = ((value - MIN) * 100) / (MAX - MIN);
  if (cups > 100) {
    cups = 100;
  } else {
    return cups;
  }
}

function CustomizedProgressBars() {
  const classes = useStyles();
  const [water, setWater] = useState();
  const [user, setUser] = useState("");

  useEffect(() => {
    return db
      .collection("Water")
      .where("user_name", "==", "emily nicholas")
      .onSnapshot((snapshot) => {
        const waterArr = [];
        snapshot.forEach((doc) => {
          const now = new Date();
          const lastMidnight = now.setHours(0, 0, 0, 0) / 1000;
          if (doc.data().date_created.seconds >= lastMidnight) {
            waterArr.push(doc.data());
          }
        });
        setWater(waterArr.length);
      });
  }, []);
  return (
    <Grid item className={classes.root}>
      <BorderLinearProgress variant="determinate" value={normalize(water)} />
    </Grid>
  );
}

export default CustomizedProgressBars;
