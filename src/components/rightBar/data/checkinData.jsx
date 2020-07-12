import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { db } from "../../../firebase";

function CheckinData({ username }) {
  const data = {
    datasets: [
      {
        label: "Wellness Score Change",
        type: "line",
        data: [2, -2, 6, 8, -9, 0],
        fill: false,
        borderColor: "#EC932F",
        backgroundColor: "#EC932F",
        pointBorderColor: "#EC932F",
        pointBackgroundColor: "#EC932F",
        pointHoverBackgroundColor: "#EC932F",
        pointHoverBorderColor: "#EC932F",
        yAxisID: "y-axis-1",
      },
      {
        label: "Wellness Score Start",
        type: "line",
        data: [7],
        fill: false,
        // borderColor: "#EC932F",
        // backgroundColor: "#EC932F",
        // pointBorderColor: "#EC932F",
        // pointBackgroundColor: "#EC932F",
        // pointHoverBackgroundColor: "#EC932F",
        // pointHoverBorderColor: "#EC932F",
        yAxisID: "y-axis-1",
      },
      {
        label: "Wellness Score End",
        type: "line",
        data: [9],
        fill: false,
        // borderColor: "#EC932F",
        // backgroundColor: "#2f71a9",
        // pointBorderColor: "#2f71a9",
        // pointBackgroundColor: "#2f71a9",
        // pointHoverBackgroundColor: "#2f71a9",
        // pointHoverBorderColor: "#2f71a9",
        yAxisID: "y-axis-1",
      },
      // {
      //   label: "Stretch",
      //   type: "bar",
      //   data: ["false", 1, -1, -1, -1],
      //   fill: false,
      //   backgroundColor: "#71B37C",
      //   borderColor: "#71B37C",
      //   hoverBackgroundColor: "#71B37C",
      //   hoverBorderColor: "#71B37C",
      //   yAxisID: "y-axis-1",
      // },
      // {
      //   label: "Pomodoro",
      //   type: "bar",
      //   data: [1, 1, 1, -1, 1],
      //   fill: false,
      //   backgroundColor: "#71B37C",
      //   borderColor: "#71B37C",
      //   hoverBackgroundColor: "#71B37C",
      //   hoverBorderColor: "#71B37C",
      //   yAxisID: "y-axis-1",
      // },
      // {
      //   label: "Water",
      //   type: "bar",
      //   data: [1, -1, 1, -1, 1],
      //   fill: false,
      //   backgroundColor: "#71B37C",
      //   borderColor: "#71B37C",
      //   hoverBackgroundColor: "#71B37C",
      //   hoverBorderColor: "#71B37C",
      //   yAxisID: "y-axis-1",
      // },
    ],
  };

  const options = {
    responsive: true,
    tooltips: {
      mode: "label",
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        },
      ],
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
        // {
        //   type: "linear",
        //   display: true,
        //   position: "right",
        //   id: "y-axis-2",
        //   gridLines: {
        //     display: false,
        //   },
        //   labels: {
        //     show: true,
        //   },
        // },
      ],
    },
  };

  const plugins = [
    {
      afterDraw: (chartInstance, easing) => {
        const ctx = chartInstance.chart.ctx;
        ctx.fillText("This text drawn by a plugin", 150, 100);
      },
    },
  ];

  const [monday, setMonday] = useState(0);
  const [tuesday, setTuesday] = useState(0);
  const [wednesday, setWednesday] = useState(0);
  const [thursday, setThursday] = useState(0);
  const [friday, setFriday] = useState(0);
  useEffect(() => {
    return db
      .collection("Daily")
      .where("user_name", "==", username)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const now = new Date();
          const lastMidnight = now.setHours(0, 0, 0, 0) / 1000;
          const secondsInADay = 86400;
          const secondsInAWeek = secondsInADay * 7;
          const lastWeek = lastMidnight - secondsInAWeek;
          if (
            doc.data().date_created.seconds > lastWeek &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 2
          ) {
          }
        });
      });
  }, [username]);

  return (
    <div>
      <h2>Mixed data Example</h2>
      <Bar data={data} options={options} plugins={plugins} />
    </div>
  );
}

export default CheckinData;
