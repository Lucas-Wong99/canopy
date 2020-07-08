import React from "react";
import { Box } from "grommet";
import { functions } from "../firebase";

function CreateStatus() {
  const addStatus = (status) => {
    const createStatus = functions.httpsCallable("addStatus");
    createStatus({
      status
    })
      .then((res) => {
        console.log("USERNAME!!!!", res.user_name);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <article>
      <Box
        border={{ size: "small", color: "black" }}
        pad="xsmall"
        margin="small"
      >
        <div>
          <button onClick={() => addStatus("A little tired need coffee")}>
            Coffee Break
          </button>
          <button onClick={() => addStatus("About to start a Pomodoro timer")}>
            Pomodoro Timer
          </button>
        </div>
      </Box>
    </article>
  );
}

export default CreateStatus;
