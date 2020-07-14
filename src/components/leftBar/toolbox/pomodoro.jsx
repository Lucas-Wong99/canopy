import React, { useEffect, useState } from "react";
import { functions } from "../../../firebase";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
      zIndex: 2
    }
  },
  time: {
    fontSize: "72px",
    fontWeight: 400,
    color: "#272727",
    display: "block",
    width: "100%",
    textAlign: "center",
    zIndex: 2
  }
}));

function Pomodoro() {
  const classes = useStyles();
  const [currentStatus, setCurrentStatus] = useState("");
  // Stateful Timers Client Side
  const [time, setTime] = useState(1500);
  const [play, setPlay] = useState(false);

  //Firebase function to add Status to database
  const addStatus = (status) => {
    setCurrentStatus(status);
    const createStatus = functions.httpsCallable("addStatus");
    createStatus({
      status
    })
      .then((res) => {
        console.log("New Status", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNotificationTitle = (status) => {
    if (status === "is about to start a deep work session.") {
      return "Break time! Your work session is over";
    } else if (status === "needs a social break!") {
      return "Your social break is over 🙂";
    } else if (status === "Is taking a coffee break. You should come!") {
      return "Coffee break is over!";
    }
  };

  //Creates a client side notification when a timer ends
  const timerNotification = (status) => {
    const notificationTitle = createNotificationTitle(status);
    const notification = new Notification(notificationTitle, {
      icon: "canopyIcon512.png",
      body: ""
    });
    notification.onClick = function () {
      window.open("https://canopy-1bb2b.firebaseapp.com/");
    };
    console.log(notification);
  };

  //Controls the timers
  useEffect(() => {
    let interval = null;
    if (!play) {
      return;
    }
    if (play) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (!play && time !== 0) {
      clearInterval(interval);
    }
    if (!time >= 1) {
      setPlay(false);
      timerNotification(currentStatus);
      //If statement that uses conditions to create the correct message
      if (currentStatus === "is about to start a deep work session.") {
        addStatus("has finished a deep work session.");
      } else if (currentStatus === "needs a social break!") {
        addStatus("has finished a social break.");
      } else if (
        currentStatus === "is taking a coffee break. You should come!"
      ) {
        addStatus("has finished a coffee break.");
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [play, time]);

  function toggle() {
    setPlay(!play);
  }

  function reset(time) {
    setTime(time);
    setPlay(false);
  }

  const format = function (seconds) {
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor((seconds % 3600) % 60);
    let timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  };

  return (
    <div className={classes.root}>
      <div className="container display timer">
        <h1 className={classes.time}> {format(time)} </h1>
        <p>Let's track your Canopy time</p>
      </div>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <Button
          onClick={() => {
            addStatus("is about to start a deep work session.");
            reset(10);
          }}
        >
          Deep Work
        </Button>

        <Button
          onClick={() => {
            addStatus("needs a social break!");
            reset(10);
          }}
        >
          Social Time
        </Button>

        <Button
          onClick={() => {
            addStatus("is taking a coffee break. You should come!");
            reset(10);
          }}
        >
          {" "}
          Coffee Break
        </Button>
      </ButtonGroup>

      <Button variant="contained" color="primary" onClick={toggle}>
        {play ? "Pause" : "Start"}
      </Button>
    </div>
  );
}

export default Pomodoro;
