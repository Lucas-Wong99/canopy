import React from "react";
import { Pie } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  daily: {
    // display: "flex",
  }
}));

function DailyDataVis({ socialDay, workDay, coffeeDay }) {
  const classes = useStyles();

  const daily = {
    labels: ["Social Breaks", "Heads Down Work", "Coffee Breaks"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#294C60", "#773344", "#FFC857"],
        hoverBackgroundColor: ["#447c9b", "#a5495f", "#9b7933"],
        data: [socialDay, workDay, coffeeDay]
      }
    ]
  };

  return (
    <Grid item className={classes.daily}>
      <Pie
        data={daily}
        height={250}
        width={250}
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
