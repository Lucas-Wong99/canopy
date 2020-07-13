import React from "react";
import moment from "moment";
import { Grid } from "grommet";
import { functions } from "../firebase";
import FlareIcon from "@material-ui/icons/Flare";
import IconButton from "@material-ui/core/IconButton";

function Status({ id, date_created, user_name, status, claps }) {
  const increaseClaps = (statusId) => {
    const incrementClaps = functions.httpsCallable("incrementClaps");
    incrementClaps({
      id: statusId,
    })
      .then(() => {
        return;
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <article>
      <Grid
        container
        border={{ size: "small", color: "black" }}
        pad="xsmall"
        margin="small"
      >
        <Grid item>
          <div>
            <h4>{user_name}</h4>
          </div>
          <div>{status}</div>
          {moment(date_created.toDate()).fromNow()}
          <IconButton onClick={() => increaseClaps(id)}>👏</IconButton>
            {claps}
        </Grid>
      </Grid>
    </article>
  );
}

export default Status;
