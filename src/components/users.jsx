import React from "react";
import { Grommet, Grid, Box } from "grommet";

function User({ first, last, current_status }) {
  return (
    <Box border={{ size: "small", color: "black" }} pad="xsmall" margin="small">
      <div>
        {first + " "}
        {last}
      </div>
      <div>{current_status}</div>
    </Box>
  );
}

export default User;
