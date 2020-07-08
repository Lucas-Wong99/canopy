import React from "react";
import { Badge, Avatar, Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

let status_color = "black";

function User({ name, photoURL, current_status }) {
  if (current_status === "About to start a Pomodoro timer") {
    status_color = "pink";
  } else if (current_status === "A little tired need coffee") {
    status_color = "green";
  } else {
    status_color = "orange";
  }
  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: status_color,
      color: status_color,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }))(Badge);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }));

  const classes = useStyles();

  return (
    <Grid item className={classes.root}>
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent=" "
      >
        <Avatar className={classes.large} alt={name} src={photoURL} />
      </StyledBadge>
      {/* <h1>{current_status}</h1> */}
    </Grid>
  );
}

export default User;
