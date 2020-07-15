import React, { useState } from "react";
import { Backdrop, Button, Paper } from "@material-ui/core";
import { functions } from "../../../firebase";
import { useStyles } from "../../../hooks/checkin/dailyCheck-in";

import DiscreteSlider from "./slider";
import ToolSelector from "./toolSelector";

export default function Checkin({ setCheckinData, checkinData }) {
  const classes = useStyles();
  const [wellnessScore, setWellnessScore] = useState(8);

  const { pomodoro, water, stretch } = checkinData;

  // const [toolSelector, setToolSelector] = useState({
  //   pomodoro: true,
  //   water: false,
  //   stretch: false
  // });
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
            setCheckinData={setCheckinData}
            checkinData={checkinData}
          />

          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => {
              handleToggle();
              createCheck(wellnessScore, pomodoro, water, stretch);
            }}
          >
            Submit
          </Button>
        </Paper>
      </Backdrop>
    </div>
  );
}
