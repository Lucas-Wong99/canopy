import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

//Need to circle back and extract state up to the parent level (maybe all the way up to the top so it can be passed back down to conditionally render the tools picked)
export default function ToolSelector({ toolSelector, setToolSelector }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setToolSelector({
      ...toolSelector,
      [event.target.name]: event.target.checked
    });
  };

  const { pomodoro, water, stretch } = toolSelector;
  // const error = [pomodoro, water, stretch].filter((v) => v).length !== 2;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          What tools would help you flourish today?
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={pomodoro}
                onChange={handleChange}
                name="pomodoro"
              />
            }
            label="Pomodoro Timer"
          />
          <FormControlLabel
            control={
              <Checkbox checked={water} onChange={handleChange} name="water" />
            }
            label="Water Tracker"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={stretch}
                onChange={handleChange}
                name="stretch"
              />
            }
            label="Stretch Reminders"
          />
        </FormGroup>
        <FormHelperText>Use as many or as few as you need.</FormHelperText>
      </FormControl>
    </div>
  );
}
