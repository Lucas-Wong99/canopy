import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

//Need to circle back and extract state up to the parent level (maybe all the way up to the top so it can be passed back down to conditionally render the tools picked)
export default function ToolSelector() {
  const classes = useStyles();
  const [state, setState] = useState({
    pomodoro: true,
    water: false,
    stretch: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { pomodoro, water, stretch } = state;
  // const error = [pomodoro, water, stretch].filter((v) => v).length !== 2;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">What tools did you love?</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={pomodoro}
                onChange={handleChange}
                name="pomodoro"
              />
            }
            label="Pomodoro Timer"
          />

          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={water}
                onChange={handleChange}
                name="water"
              />
            }
            label="Water Tracker"
          />

          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={stretch}
                onChange={handleChange}
                name="stretch"
              />
            }
            label="Stretch Reminders"
          />
        </FormGroup>
        <FormHelperText>
          It's okay, we don't judge. We just want to know which tools help you
          grow the most!
        </FormHelperText>
      </FormControl>
    </div>
  );
}
