import React from "react";
import Pomodoro from "./pomodoro";
import WaterButton from "./water_btn";
import StretchButton from "./stretch_btn";

function Toolbox() {
  return (
    <div>
      <Pomodoro />
      <WaterButton />
      <StretchButton />
    </div>
  );
}

export default Toolbox;
