import React from "react";
import { functions } from "../../../firebase";
import { Button } from "@material-ui/core";

function WaterButton() {
  const addCup = () => {
    const addWater = functions.httpsCallable("addWater");
    addWater()
      .then(() => {
        console.log("ya added some water");
      })
      .catch((error) => {
        console.log("ya didn't add some water");
        return error;
      });
  };
  return (
      <Button variant="contained" color="primary" onClick={() => addCup()}>Drank 1 Cup of Water</Button>
  );
}

export default WaterButton;
