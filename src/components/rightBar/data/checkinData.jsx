import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { db } from "../../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
// import {
//   data,
//   options,
//   useStyles,
//   plugins,
// } from "../../../hooks/checkin/weeklyTrendGraph";

const useStyles = makeStyles((theme) => ({
  moodTrend: {
    width: "600px",
    height: "300px",
  },
  title: {
    margin: 0,
  },
}));

function CheckinData({ username }) {
  function dateConv(secs) {
    const date = new Date(secs * 1000);
    let day = date.getDay();
    if (day === 1) {
      return "Monday";
    } else if (day === 2) {
      return "Tuesday";
    } else if (day === 3) {
      return "Wednesday";
    } else if (day === 4) {
      return "Thursday";
    } else if (day === 5) {
      return "Friday";
    } else if (day === 6) {
      return "Saturday";
    } else if (day === 0) {
      return "Sunday";
    } else {
      return "No Data";
    }
  }
  const [today, setToday] = useState({});
  const [seven, setSeven] = useState({});
  const [six, setSix] = useState({});
  const [five, setFive] = useState({});
  const [four, setFour] = useState({});
  const [three, setThree] = useState({});
  const [two, setTwo] = useState({});
  const [one, setOne] = useState({});
  const data = {
    datasets: [
      {
        label: "Wellness Score Change",
        type: "line",
        data: [
          seven.moodEnd - seven.moodStart,
          six.moodEnd - six.moodStart,
          five.moodEnd - five.moodStart,
          four.moodEnd - four.moodStart,
          three.moodEnd - three.moodStart,
          two.moodEnd - two.moodStart,
          one.moodEnd - one.moodStart,
          today.moodEnd - today.moodStart,
        ],
        fill: false,
        borderColor: "#7CA982",
        backgroundColor: "#7CA982",
        pointBorderColor: "#7CA982",
        pointBackgroundColor: "#7CA982",
        pointHoverBackgroundColor: "#7CA982",
        pointHoverBorderColor: "#7CA982",
        yAxisID: "y-axis-1",
      },
      {
        label: "Wellness Score Start",
        type: "line",
        data: [
          seven.moodStart,
          six.moodStart,
          five.moodStart,
          four.moodStart,
          three.moodStart,
          two.moodStart,
          one.moodStart,
          today.moodStart,
        ],
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
        data: [
          seven.moodEnd,
          six.moodEnd,
          five.moodEnd,
          four.moodEnd,
          three.moodEnd,
          two.moodEnd,
          one.moodEnd,
          today.moodEnd,
        ],
        fill: false,
        // borderColor: "#EC932F",
        // backgroundColor: "#2f71a9",
        // pointBorderColor: "#2f71a9",
        // pointBackgroundColor: "#2f71a9",
        // pointHoverBackgroundColor: "#2f71a9",
        // pointHoverBorderColor: "#2f71a9",
        yAxisID: "y-axis-1",
      },
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
          labels: [
            dateConv(seven.date),
            dateConv(six.date),
            dateConv(five.date),
            dateConv(four.date),
            dateConv(three.date),
            dateConv(two.date),
            dateConv(one.date),
            "Today",
          ],
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
      ],
    },
  };

  const plugins = [
    {
      afterDraw: (chartInstance, easing) => {
        const ctx = chartInstance.chart.ctx;
        ctx.fillText("", 150, 100);
      },
    },
  ];
  const classes = useStyles();
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
            doc.data().date_created.seconds <= lastWeek + secondsInADay
          ) {
            setSeven({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (
            doc.data().date_created.seconds > lastWeek + secondsInADay &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 2
          ) {
            setSix({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (
            doc.data().date_created.seconds > lastWeek + secondsInADay * 2 &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 3
          ) {
            setFive({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (
            doc.data().date_created.seconds > lastWeek + secondsInADay * 3 &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 4
          ) {
            setFour({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (
            doc.data().date_created.seconds > lastWeek + secondsInADay * 4 &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 5
          ) {
            setThree({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (
            doc.data().date_created.seconds > lastWeek + secondsInADay * 5 &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 6
          ) {
            setTwo({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (
            doc.data().date_created.seconds > lastWeek + secondsInADay * 6 &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 7
          ) {
            setOne({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (doc.data().date_created.seconds > lastMidnight) {
            setToday({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          }
        });
      });
  }, [username]);

  return (
    <Box item className={classes.moodTrend}>
      <h4 className={classes.title}>Weekly Mood Trend</h4>
      <Bar data={data} options={options} plugins={plugins} />
    </Box>
  );
}

export default CheckinData;
