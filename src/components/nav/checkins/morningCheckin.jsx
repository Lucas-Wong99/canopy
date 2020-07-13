import React, { useState } from "react";
import { Backdrop, Button, Paper, Slider, Typography } from "@material-ui/core";
import { functions } from "../../../firebase";
import { useStyles, marks } from "../../../hooks/checkin/dailyCheck-in";

import ToolSelector from "./toolSelector";

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
    stretch: false
  });
  const [open, setOpen] = useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleToggle = () => {
    setOpen(!open);
  };

  const createCheck = (wellnessScore, pomodoro, water, stretch) => {
    const morningCheckin = functions.httpsCallable("morningCheckin");
    morningCheckin({
      moodStart: wellnessScore,
      pomodoro: pomodoro,
      stretch: stretch,
      water: water
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
      <Button
        className={classes.navButton}
        variant="outlined"
        color="primary"
        onClick={handleToggle}
      >
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
