import React from "react";
import { Pie } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dataVis: {
    display: "flex"
  },
  daily: {
    // display: "flex",
  }
}));

function DailyDataVis({ socialDay, workDay, coffeeDay }) {
  const classes = useStyles();

  const daily = {
    labels: ["Self-care", "Heads down work", "Collaboration"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
        data: [socialDay, workDay, coffeeDay]
      }
    ]
  };

  return (
    <Grid item className={classes.daily}>
      <Pie
        data={daily}
        // height={50}
        // width={50}
        options={{
          title: {
            display: true,
            text: "Breakdown of your day",
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

export default DailyDataVis;
