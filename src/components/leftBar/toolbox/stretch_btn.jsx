import React from "react";
import { functions } from "../../../firebase";

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
    <div>
      <button onClick={() => addStretch()}>Took a stretch break!</button>
    </div>
  );
}

export default StretchButton;
