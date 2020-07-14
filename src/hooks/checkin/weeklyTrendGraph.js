import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  moodTrend: {
    width: "600px",
    height: "300px",
  },
  title: {
    margin: 0,
  },
}));

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

export { data, options, useStyles, plugins };
