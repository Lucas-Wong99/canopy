import React from "react";
import { Badge, Avatar, Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { functions } from "../firebase";

let status_color = "black";

function User({ name, photoURL, current_status, token }) {
  if (current_status === "is about to start a deep work session.") {
    status_color = "#773344";
  } else if (current_status === "needs a social break!") {
    status_color = "#294C60";
  } else if (current_status === "is taking a coffee break. You should come!") {
    status_color = "#FFC857";
  } else {
    status_color = "#7CA982";
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
        content: '""'
      }
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0
      }
    }
  }))(Badge);

  const StyledBadge2 = withStyles((theme) => ({
    badge: {
      backgroundColor: theme.palette.background.paper,
      color: "black",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&:hover": {
        cursor: "pointer",
        background: "#7CA982",
        color: theme.palette.background.paper
      }
    }
  }))(Badge);

  const useStyles = makeStyles((theme) => ({
    root: {
      marginLeft: "10px",
      display: "flex",
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15)
    }
  }));

  const classes = useStyles();

  const send = (token) => {
    const sendMessage = functions.httpsCallable("sendMessage");
    sendMessage({
      token
    })
      .then((res) => {
        console.log("USERNAME!!!!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid item className={classes.root}>
      <StyledBadge2
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        badgeContent="nudge"
        onClick={() => send(token)}
      >
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          badgeContent=" "
        >
          <Avatar className={classes.large} alt={name} src={photoURL} />
        </StyledBadge>
      </StyledBadge2>
      {/* <button onClick={() => send(token)}>Nudge</button> */}
    </Grid>
  );
}

export default User;
