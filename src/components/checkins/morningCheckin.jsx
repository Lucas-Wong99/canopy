import React from "react";
import { Backdrop, Button, Paper, Slider, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

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

function valuetext(value) {
  return `${value}°C`;
}

const DiscreteSlider = function () {
  const classes = useStyles();

  return (
    <div className={classes.slider}>
      <Typography id="discrete-slider-always">
        How would you rate your wellness today?
      </Typography>
      <Slider
        defaultValue={8}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button>

      <Backdrop className={classes.backdrop} open={open}>
        <Paper className={classes.paper} elevation={3} variant="outlined">
          <DiscreteSlider />
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={handleToggle}
          >
            Submit
          </Button>
        </Paper>
      </Backdrop>
    </div>
  );
}
