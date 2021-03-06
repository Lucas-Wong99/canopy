import React, { useEffect } from "react";
import Dashboard from "./dashboard/dashboard";
import { Container, makeStyles } from "@material-ui/core";
import { messaging, functions } from "../firebase";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "linear-gradient(45deg, #7CA982 30%, #0D4439 90%)"
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#acdbb2",
      main: "#7ca982",
      dark: "#4f7a55",
      contrastText: "#000000"
    },
    secondary: {
      light: "#4c685f",
      main: "#243e36",
      dark: "#00180f",
      contrastText: "#ffffff"
    }
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif"
  },
  spacing: 8

  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 960,
  //     lg: 1280,
  //     xl: 1920,
  //   }
  // },
  //density:
  //z-index
  //overrides
});

function App() {
  const classes = useStyles();

  const sendToken = (token) => {
    const sendTokenToFirestore = functions.httpsCallable(
      "sendTokenToFirestore"
    );
    sendTokenToFirestore({
      token
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  };
  useEffect(() => {
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log("TOKEN", token);
        sendToken(token);
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", (message) =>
      console.log(message)
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container} maxWidth={false}>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}

export default App;
