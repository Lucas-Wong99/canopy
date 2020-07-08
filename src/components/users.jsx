import React from "react";
import { Box } from "grommet";
import { Avatar } from "@material-ui/core";

function User({ name, photoURL, current_status }) {
  return (
    <Box border={{ size: "small", color: "black" }} pad="xsmall" margin="small">
      <div>{name}</div>
      <Avatar alt="Cindy Baker" src={photoURL} />
      <div>{current_status}</div>
    </Box>
  );
}

export default User;
