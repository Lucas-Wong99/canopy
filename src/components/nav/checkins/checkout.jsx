import React, { useState } from "react";
import { Backdrop, Button, Paper, Slider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ToolRater from "./toolRater";
import { functions } from "../../../firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    margin: theme.spacing(10),
    width: 400,
    height: 600,
  },

  slider: {
    width: 300,
    height: theme.spacing(3),
  },

  button: {
    height: "20px",
    width: "100px",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];

const DiscreteSlider = function ({ setWellnessScore }) {
  const classes = useStyles();

  function valuetext(event, value) {
    setWellnessScore(value);
    return `${value}`;
  }

  return (
    <div className={classes.slider}>
      <Typography id="discrete-slider-always">
        How would you rate your wellness after today?
      </Typography>
      <Slider
        defaultValue={8}
        aria-labelledby="discrete-slider-always"
        step={1}
        onChangeCommitted={valuetext}
        marks={marks}
        max={10}
        min={1}
        valueLabelDisplay="on"
      />
    </div>
  );
};

export default function Checkout() {
  const classes = useStyles();
  const [wellnessScore, setWellnessScore] = useState(0);
  const [toolRater, setToolRater] = useState({
    pomodoro: true,
    water: false,
    stretch: false,
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const updateCheck = (wellnessScore, pomodoro, water, stretch) => {
    const checkinUpdate = functions.httpsCallable("checkinUpdate");
    checkinUpdate({
      moodEnd: wellnessScore,
      pomRate: pomodoro,
      stretchRate: stretch,
      waterRate: water,
      dailyId: localStorage.getItem("morningCheckinId"),
    })
      .then(() => {
        console.log("success!");
      })
      .catch((error) => {
        console.log("error");
        return error;
      });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Checkout
      </Button>

      <Backdrop className={classes.backdrop} open={open}>
        <Paper className={classes.paper} elevation={3} variant="outlined">
          <DiscreteSlider setWellnessScore={setWellnessScore} />

          <ToolRater setToolRater={setToolRater} toolRater={toolRater} />

          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => {
              handleToggle();
              updateCheck(
                wellnessScore,
                toolRater.pomodoro,
                toolRater.water,
                toolRater.stretch
              );
            }}
          >
            Submit
          </Button>
        </Paper>
      </Backdrop>
    </div>
  );
}
