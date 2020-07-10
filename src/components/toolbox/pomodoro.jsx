import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import "./pomodoro.css";
import { functions } from "../../firebase";

function Pomodoro() {
  //Firebase functionality
  const addStatus = (status) => {
    const createStatus = functions.httpsCallable("addStatus");
    createStatus({
      status
    })
      .then((res) => {
        console.log("USERNAME!!!!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Stateful Timers Client Side
  const [time, setTime] = useState(1500);
  const [play, setPlay] = useState(false);

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
      addStatus("Finshed");
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
            addStatus(`is starting a about to start a deep work session`);
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
            addStatus(`Is taking a coffee break. You should come!`);
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
    </div> /* Pomodoro */
  );
}

export default Pomodoro;
