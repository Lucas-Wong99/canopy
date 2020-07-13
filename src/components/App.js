import React, { useEffect } from "react";
import Dashboard from "./dashboard/dashboard";
import { Container } from "@material-ui/core";
import { messaging, functions } from "../firebase";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
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
      <Container maxWidth={false}>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}

export default App;
