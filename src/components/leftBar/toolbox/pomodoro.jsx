import React, { useEffect, useState } from "react";
import { functions } from "../../../firebase";
import "./pomodoro.css";
// import { makeStyles } from "@material-ui/core/styles";

function Pomodoro() {
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
    if (status === "is about to start a deep work session") {
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
      icon: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
      body: ""
    });
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
      if (currentStatus === "is about to start a deep work session") {
        addStatus("has finished a deep work session.");
      } else if (currentStatus === "needs a social break!") {
        addStatus("has finished a social break.");
      } else if (
        currentStatus === "Is taking a coffee break. You should come!"
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
    <div className="pomodoro">
      <div className="container display timer">
        <span className="time">{format(time)}</span>
        <span className="timeType">The time!</span>
      </div>

      <div className="container display types">
        <button
          className="btn"
          onClick={() => {
            addStatus("is about to start a deep work session");
            reset(10);
          }}
        >
          Deep Work
        </button>

        <button
          className="btn"
          onClick={() => {
            addStatus("needs a social break!");
            reset(10);
          }}
        >
          Social
        </button>

        <button
          className="btn"
          onClick={() => {
            addStatus("Is taking a coffee break. You should come!");
            reset(10);
          }}
        >
          Coffee
        </button>
      </div>

      <div className="container">
        <div className="controlsPlay">
          <button
            className={play ? "stop btnIcon" : "play btnIcon"}
            onClick={toggle}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
