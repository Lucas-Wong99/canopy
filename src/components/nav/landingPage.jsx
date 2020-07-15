import React, { useState } from "react";
import { Backdrop, Button, Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import googleSignin from "./google_btn";
// import Image from "../../canopyPhoto.jpg";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    color: theme.palette.text.secondary,
    height: "90%",
    width: "90%",
    position: "relative",
    // backgroundImage: `url("/canopyPhoto.jpg")`,
    // backgroundSize: "cover",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // borderRadius: "20px",
  },
  video: {
    // alignItems: "center",
    height: "100%",
    width: "100%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  button: {
    margin: "40px",
    width: "100px",
  },
  fakeButton: {
    padding: "40px",
    background: "transparent",
    border: "none",
    fontSize: 0,
    cursor: "pointer",
    outline: "none",
  },
  welcome: {
    position: "absolute",
    height: "80%",
    width: "80%",
    fontSize: "100px",
    color: "white",
    display: "flex",
    flexDirection: "column",
  },
  cancel: {
    position: "absolute",
    top: "50px",
    right: "200px",
    cursor: "pointer",
    // display: "flex",
    // alignItem: "start",
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <button className={classes.fakeButton} onClick={() => handleOpen()}>
        Landing
      </button>

      <Backdrop className={classes.backdrop} open={open}>
        {/* <Paper className={classes.paper} elevation={3} variant="outlined"> */}
        <video autoPlay="autoplay" loop="loop" muted className={classes.video}>
          <source src="/video.mp4" type="video/mp4" />
          Your Browser does not support this video tag
        </video>
        <div className={classes.cancel}>
          <CancelIcon onClick={() => handleClose()}></CancelIcon>
        </div>
        <div className={classes.welcome}>
          <h1>CANOPY</h1>
          working together, apart
          {/* <img height="75px" src="/CanopyLogo.png" alt="Canopy Logo" /> */}
          <Button
            className={classes.button}
            variant="contained"
            color="default"
            onClick={() => {
              googleSignin();
              handleClose();
            }}
          >
            Sign In
          </Button>
        </div>

        {/* </Paper> */}
      </Backdrop>
    </Container>
  );
}
