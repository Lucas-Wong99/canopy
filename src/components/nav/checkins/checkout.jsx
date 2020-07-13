import React, { useState } from "react";
import { Backdrop, Button, Paper, Slider, Typography } from "@material-ui/core";
import { functions } from "../../../firebase";
import { useStyles, marks } from "../../../hooks/checkin/dailyCheck-in";

import ToolRater from "./toolRater";

const DiscreteSlider = function ({ setWellnessScore }) {
  const classes = useStyles();

  function valuetext(event, value) {
    console.log("Within Value text", value);
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
    stretch: false
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const updateCheck = (wellnessScore, pomodoro, water, stretch) => {
    console.log("The wellness Score", wellnessScore);
    const checkinUpdate = functions.httpsCallable("checkinUpdate");
    checkinUpdate({
      moodEnd: wellnessScore,
      pomRate: pomodoro,
      stretchRate: stretch,
      waterRate: water,
      dailyId: localStorage.getItem("morningCheckinId")
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
