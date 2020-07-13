import React from "react";
import { Slider, Typography } from "@material-ui/core";
import { useStyles, marks } from "../../../hooks/checkin/dailyCheck-in";

const DiscreteSlider = function ({ setWellnessScore, time }) {
  const classes = useStyles();

  function valuetext(event, value) {
    setWellnessScore(value);
    return `${value}`;
  }

  return (
    <div className={classes.slider}>
      <Typography id="discrete-slider-always">
        How would you rate your wellness {time} today?
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

export default DiscreteSlider;
