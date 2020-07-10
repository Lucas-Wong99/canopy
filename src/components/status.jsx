import React from "react";
import moment from "moment";
import { Box } from "grommet";
import { functions } from "../firebase";
import FlareIcon from "@material-ui/icons/Flare";
import IconButton from "@material-ui/core/IconButton";

function Status({ id, date_created, user_name, status, claps }) {
  const increaseClaps = (statusId) => {
    const incrementClaps = functions.httpsCallable("incrementClaps");
    incrementClaps({
      id: statusId
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
          <h4>{user_name}</h4>
        </div>
        <div>{status}</div>
        {moment(date_created.toDate()).fromNow()}
        <IconButton onClick={() => increaseClaps(id)}>
          <FlareIcon />
        </IconButton>
          {claps}
      </Box>
    </article>
  );
}

export default Status;
