import React from "react";
import { Pie } from "react-chartjs-2";
import { Box } from "@material-ui/core";

const state = {
  labels: ["Self-care", "Heads down work", "Collaboration"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00"],
      hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
      data: [10, 30, 60],
    },
  ],
};

export default class DataVis extends React.Component {
  render() {
    return (
      <div>
        <Pie
          data={state}
          height={100}
          width={150}
          options={{
            title: {
              display: true,
              text: "Breakdown of your day",
              fontSize: 10,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
        <Pie
          data={state}
          height={100}
          width={150}
          options={{
            title: {
              display: true,
              text: "Breakdown of your day",
              fontSize: 10,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}
