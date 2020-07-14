import React, { useEffect, useState } from "react";
import { Typography, Box } from "@material-ui/core";
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
    background: "linear-gradient(45deg, #B8D1E0 30%, #294C60 90%)",
    // height: "50px",
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

function WaterBar({ username }) {
  const classes = useStyles();
  const [water, setWater] = useState();

  useEffect(() => {
    return db
      .collection("Water")
      .where("user_name", "==", username)
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
  }, [username]);
  return (
    <Box className={classes.root} display="flex" alignItems="center">
      <Box>
        <BorderLinearProgress variant="determinate" value={normalize(water)} />
      </Box>
      <Box margin={1}>
        <Typography component={"span"} variant="body2" color="textSecondary">
          {water}/8
        </Typography>
      </Box>
    </Box>
  );
}

export default WaterBar;
