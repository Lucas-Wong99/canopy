import React from "react";
import moment from "moment";
import { Grommet, Grid, Box } from "grommet";

function Status({ date_created, user_name, status }) {
  return (
    <article>
      <Box
        border={{ size: "small", color: "black" }}
        pad="xsmall"
        margin="small"
      >
        <div>
          <h4>{user_name}</h4>
        </div>
        <div>{status}</div>
        {moment(date_created.toDate()).fromNow()}
      </Box>
    </article>
  );
}

export default Status;
