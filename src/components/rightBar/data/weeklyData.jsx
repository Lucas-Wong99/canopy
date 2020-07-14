import React from "react";
import { Pie } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { db, functions } from "../../../firebase";
// import { Timestamp } from "@google-cloud/firestore";

const useStyles = makeStyles((theme) => ({
  dataVis: {
    // display: "flex",
  },
  daily: {
    // display: "flex",
  }
}));

function WeeklyDataVis({ workWeek, coffeeWeek, socialWeek }) {
  const classes = useStyles();

  const weekly = {
    labels: ["Social Breaks", "Heads Down Work", "Coffee Breaks"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#294C60", "#773344", "#FFC857"],
        hoverBackgroundColor: ["#447c9b", "#a5495f", "#9b7933"],
        data: [socialWeek, workWeek, coffeeWeek]
      }
    ]
  };

  return (
    <Grid item className={classes.daily}>
      <Pie
        data={weekly}
        height={250}
        width={250}
        options={{
          title: {
            display: true,
            text: "Breakdown of your week",
            fontSize: 10
          },
          legend: {
            display: false,
            position: "right"
          }
        }}
      />
    </Grid>
  );
}

export default WeeklyDataVis;
