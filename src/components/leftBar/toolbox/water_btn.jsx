import React from "react";
import { functions } from "../../../firebase";

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
    <div>
      <button onClick={() => addCup()}>Drank 1 Cup of Water</button>
    </div>
  );
}

export default WaterButton;
