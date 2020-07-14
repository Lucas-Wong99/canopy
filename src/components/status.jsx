import React from "react";
import moment from "moment";
import { functions } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
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
    font: theme.typography,
  },
  username: {
    fontWeight: "bold",
    font: theme.typography,
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
  );
}

export default Status;
