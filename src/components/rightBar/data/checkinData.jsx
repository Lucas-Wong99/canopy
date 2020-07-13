import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { db } from "../../../firebase";

function CheckinData({ username }) {
  function dateConv(secs) {
    const date = new Date(secs * 1000);
    console.log("date", date);
    let day = date.getDay();
    console.log("day", day);
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
    } else {
      return "No Data";
    }
  }
  const [today, setToday] = useState({});
  const [monday, setMonday] = useState({});
  const [tuesday, setTuesday] = useState({});
  const [wednesday, setWednesday] = useState({});
  const [thursday, setThursday] = useState({});
  const [friday, setFriday] = useState({});
  const data = {
    datasets: [
      {
        label: "Wellness Score Change",
        type: "line",
        data: [
          monday.moodEnd - monday.moodStart,
          tuesday.moodEnd - tuesday.moodStart,
          wednesday.moodEnd - wednesday.moodStart,
          thursday.moodEnd - thursday.moodStart,
          friday.moodEnd - friday.moodStart,
          today.moodEnd - today.moodStart,
        ],
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
        data: [
          monday.moodStart,
          tuesday.moodStart,
          wednesday.moodStart,
          thursday.moodStart,
          friday.moodStart,
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
          monday.moodEnd,
          tuesday.moodEnd,
          wednesday.moodEnd,
          thursday.moodEnd,
          friday.moodEnd,
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
          labels: [
            dateConv(monday.date),
            dateConv(tuesday.date),
            dateConv(wednesday.date),
            dateConv(thursday.date),
            dateConv(friday.date),
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
        ctx.fillText("", 150, 100);
      },
    },
  ];

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
            setMonday({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (
            doc.data().date_created.seconds > lastWeek + secondsInADay &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 2
          ) {
            setTuesday({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (
            doc.data().date_created.seconds > lastWeek + secondsInADay * 2 &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 3
          ) {
            setWednesday({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (
            doc.data().date_created.seconds > lastWeek + secondsInADay * 3 &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 4
          ) {
            setThursday({
              moodStart: doc.data().moodStart,
              moodEnd: doc.data().moodEnd,
              date: doc.data().date_created.seconds,
            });
          } else if (
            doc.data().date_created.seconds > lastWeek + secondsInADay * 4 &&
            doc.data().date_created.seconds <= lastWeek + secondsInADay * 5
          ) {
            setFriday({
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
    <div>
      <h2>Mixed data Example</h2>
      <Bar data={data} options={options} plugins={plugins} />
    </div>
  );
}

export default CheckinData;
