import React from "react";
import moment from "moment";
import { functions } from "../firebase";
import FlareIcon from "@material-ui/icons/Flare";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, Avatar, Grid, Box } from "@material-ui/core";
import ClapButton from "react-clap-button";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  status: {
    display: "flex",
    padding: "10px",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
  },
  moment: {
    fontSize: "10px",
    fontStyle: "italic",
  },
  clap: {
    width: "50px",
    height: "50px",
  },
}));

function Status({ id, date_created, user_name, status, claps }) {
  const classes = useStyles();
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
      <Grid container margin="small" className={classes.root}>
        <Grid item className={classes.status}>
          <Box border={{ size: "small", color: "black" }}>
            <div>
              <span className={classes.username}>{user_name}</span> {status}
            </div>
            <span className={classes.moment}>
              {moment(date_created.toDate()).fromNow()}
            </span>
          </Box>
        </Grid>
        <Grid item className={classes.status}>
          {/* <IconButton >
            👏   {claps}
          </IconButton> */}
          <ClapButton
            size={10}
            countTotal={claps}
            className={classes.clap}
            maxCount={50}
            isClicked={true}
            onCountChange={() => increaseClaps(id)}
          />
        </Grid>
      </Grid>
    </article>
  );
}

export default Status;
