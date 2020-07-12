import React, { useState, useEffect } from "react";
import { Backdrop, Button, Paper, Slider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ToolSelector from "./toolSelector";
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
        How would you rate your wellness today?
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

export default function SimpleBackdrop() {
  const classes = useStyles();
  const [wellnessScore, setWellnessScore] = useState(0);
  const [toolSelector, setToolSelector] = useState({
    pomodoro: true,
    water: false,
    stretch: false,
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const createCheck = (wellnessScore, pomodoro, water, stretch) => {
    const morningCheckin = functions.httpsCallable("morningCheckin");
    morningCheckin({
      moodStart: wellnessScore,
      pomodoro: pomodoro,
      stretch: stretch,
      water: water,
    })
      .then((data) => {
        localStorage.setItem("morningCheckinId", data.data.dailyId);
        // console.log("success!", data.data.dailyId);
      })
      .catch((error) => {
        console.log("error");
        return error;
      });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Checkin
      </Button>

      <Backdrop className={classes.backdrop} open={open}>
        <Paper className={classes.paper} elevation={3} variant="outlined">
          <DiscreteSlider setWellnessScore={setWellnessScore} />

          <ToolSelector
            toolSelector={toolSelector}
            setToolSelector={setToolSelector}
          />

          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => {
              handleToggle();
              createCheck(
                wellnessScore,
                toolSelector.pomodoro,
                toolSelector.water,
                toolSelector.stretch
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
