import React from "react";
import { functions } from "../../../firebase";
import { Button } from "@material-ui/core";

function StretchButton() {
  const addStretch = () => {
    const addStretchBreak = functions.httpsCallable("addStretchBreak");
    addStretchBreak()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
      <Button variant="contained" color="primary" onClick={() => addStretch()}>Took a stretch break!</Button>
  );
}

export default StretchButton;
