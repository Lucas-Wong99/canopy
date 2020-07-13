import React, { useState } from "react";
import { Backdrop, Button, Paper } from "@material-ui/core";
import { functions } from "../../../firebase";
import { useStyles } from "../../../hooks/checkin/dailyCheck-in";

import DiscreteSlider from "./slider";
import ToolRater from "./toolRater";

export default function Checkout() {
  const classes = useStyles();
  const [wellnessScore, setWellnessScore] = useState(8);
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
          <DiscreteSlider setWellnessScore={setWellnessScore} time={"after"} />

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
