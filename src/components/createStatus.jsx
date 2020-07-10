import React from "react";
import { Box } from "grommet";
import { functions } from "../firebase";

function CreateStatus() {
  const send = () => {
    const sendMessage = functions.httpsCallable("sendMessage");
    sendMessage()
      .then((res) => {
        console.log("USERNAME!!!!", res);
      })
      .catch((err) => {
        console.log(err);
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
          <button onClick={() => send()}>send a message</button>
        </div>
      </Box>
    </article>
  );
}

export default CreateStatus;
