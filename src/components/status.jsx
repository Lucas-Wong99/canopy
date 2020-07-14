import React from "react";
import moment from "moment";
import { functions } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import ClapButton from "react-clap-button";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    paddingBottom: "5px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  status: {
    display: "flex",
    margin: "10px",
    alignItems: "center",
    font: theme.typography,
  },
  username: {
    fontWeight: "bold",
    font: theme.typography,
    border: "10px",
  },
  moment: {
    fontSize: "10px",
    fontStyle: "italic",
  },
  clap: {
    display: "flex",
    marginTop: "15px",
    marginRight: "40px",
    alignItems: "center",
    font: theme.typography,
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
    <Grid container margin="medium" className={classes.root}>
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
      <Grid item className={classes.clap}>
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
