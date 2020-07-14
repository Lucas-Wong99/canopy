import React, { useEffect, useState } from "react";
import StatusFeed from "../statusFeed";
import DailyDataVis from "./data/dailyData";
import WeeklyDataVis from "./data/weeklyData";
import CheckinData from "./data/checkinData";
import CustomizedProgressBars from "./data/waterData";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  dataVis: {
    display: "flex",
    justifyContent: "center",
  },
  waterVis: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rightPaper: {
    height: "48%",
    // padding: "10px",
  },
  rightBar: {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  status: {
    overflow: "auto",
    height: "80%",
  },
}));

export default function RightBar({ setStatusCount, user }) {
  const classes = useStyles();

  const [workDay, setWorkDay] = useState(0);
  const [coffeeDay, setCoffeeDay] = useState(0);
  const [socialDay, setSocialDay] = useState(0);
  const [workWeek, setWorkWeek] = useState(0);
  const [coffeeWeek, setCoffeeWeek] = useState(0);
  const [socialWeek, setSocialWeek] = useState(0);

  // Just a note that we're not confident the if (user) in this Effect hook is working properly,
  // and we want to test later

  // A further refactor will split this useEffect into a function that takes a sort param (daily or weekly)
  // and the snapshot array
  useEffect(() => {
    if (user) {
      return db
        .collection("Status")
        .where("user_name", "==", user)
        .onSnapshot((snapshot) => {
          const socialDayArr = [];
          const coffeeDayArr = [];
          const workDayArr = [];
          const socialWeekArr = [];
          const coffeeWeekArr = [];
          const workWeekArr = [];
          snapshot.forEach((doc) => {
            const now = new Date();
            const lastMidnight = now.setHours(0, 0, 0, 0) / 1000;
            const secondsInADay = 86400;
            const secondsInAWeek = secondsInADay * 7;
            const lastWeek = lastMidnight - secondsInAWeek;
            if (
              doc.data().date_created.seconds > lastMidnight &&
              doc.data().status === "needs a social break!"
            ) {
              socialDayArr.push(doc.data());
            }
            if (
              doc.data().date_created.seconds > lastMidnight &&
              doc.data().status === "Is taking a coffee break. You should come!"
            ) {
              coffeeDayArr.push(doc.data());
            }
            if (
              doc.data().date_created.seconds > lastMidnight &&
              doc.data().status === "is about to start a deep work session"
            ) {
              workDayArr.push(doc.data());
            }
            if (
              doc.data().date_created.seconds > lastWeek &&
              doc.data().status === "needs a social break!"
            ) {
              socialWeekArr.push(doc.data());
            }
            if (
              doc.data().date_created.seconds > lastWeek &&
              doc.data().status === "Is taking a coffee break. You should come!"
            ) {
              coffeeWeekArr.push(doc.data());
            }
            if (
              doc.data().date_created.seconds > lastWeek &&
              doc.data().status === "is about to start a deep work session"
            ) {
              workWeekArr.push(doc.data());
            }
          });
          setSocialDay(socialDayArr.length);
          setWorkDay(workDayArr.length);
          setCoffeeDay(coffeeDayArr.length);
          setSocialWeek(socialWeekArr.length);
          setWorkWeek(workWeekArr.length);
          setCoffeeWeek(coffeeWeekArr.length);
        });
    }
  }, [user]);

  return (
    <Grid item xs={6} className={classes.rightBar}>
      <Paper className={classes.rightPaper} elevation={5}>
        <h4>What are your friends up to?</h4>
        <Box className={classes.status}>
          <StatusFeed setStatusCount={setStatusCount} />
        </Box>
      </Paper>

      <Paper className={classes.rightPaper} elevation={5}>
        <Box className={classes.dataVis}>
          <DailyDataVis
            workDay={workDay}
            socialDay={socialDay}
            coffeeDay={coffeeDay}
          />
          <WeeklyDataVis
            workWeek={workWeek}
            socialWeek={socialWeek}
            coffeeWeek={coffeeWeek}
          />
        </Box>
        <Box className={classes.waterVis}>
          <h4> Daily Water intake</h4>
          <CustomizedProgressBars username={user} />
        </Box>
        <CheckinData username={user} />
      </Paper>
    </Grid>
  );
}
