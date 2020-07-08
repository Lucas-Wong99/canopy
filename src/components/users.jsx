import React from "react";
import { Box } from "grommet";

function User({ name, photoURL, current_status }) {
  return (
    <Box border={{ size: "small", color: "black" }} pad="xsmall" margin="small">
      <div>{name}</div>
      <img src={photoURL} />
      <div>{current_status}</div>
    </Box>
  );
}

export default User;
