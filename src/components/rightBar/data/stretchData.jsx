import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { db } from "../../../firebase";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: "50px",
    borderRadius: 5,
    display: "flex",
    // justifyContent: "center",
    width: "450px"
  },
  bar: {
    borderRadius: 5,
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
  }
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    // flexGrow: 1,
  }
});
const MAX = 5;
const MIN = 0;
function normalize(value) {
  let cups = ((value - MIN) * 100) / (MAX - MIN);
  if (cups > 100) {
    cups = 100;
  } else {
    return cups;
  }
}

function StretchBar({ username }) {
  const classes = useStyles();
  const [stretch, setStretch] = useState(0);

  useEffect(() => {
    return db
      .collection("Stretch")
      .where("user_name", "==", username)
      .onSnapshot((snapshot) => {
        const stretchArr = [];
        snapshot.forEach((doc) => {
          const now = new Date();
          const lastMidnight = now.setHours(0, 0, 0, 0) / 1000;
          if (doc.data().date_created.seconds >= lastMidnight) {
            stretchArr.push(doc.data());
          }
        });
        setStretch(stretchArr.length);
      });
  }, [username]);

  return (
    <Box className={classes.root} display="flex" alignItems="center">
      <Box>
        <BorderLinearProgress
          variant="determinate"
          value={normalize(stretch)}
        />
      </Box>
      <Box margin={1}>
        <Typography component={"span"} variant="body2" color="textSecondary">
          {stretch}/8
        </Typography>
      </Box>
    </Box>
  );
}

export default StretchBar;
