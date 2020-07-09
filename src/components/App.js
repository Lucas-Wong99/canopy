import React, { useEffect } from "react";
import Dashboard from "./dashboard/dashboard";
// import { auth } from "../firebase";
// import { Grommet } from "grommet";
import { Container } from "@material-ui/core";
import { messaging } from "../firebase";

function App() {
  // const [deviceToken, setDeviceToken] = useState({ deviceToken: null });

  useEffect(() => {
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log("TOKEN", token);
        // sendTokenToServer(token);
        // setDeviceToken({ deviceToken: token });
      })

      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", (message) =>
      console.log(message)
    );

    messaging.onMessage(function (payload) {
      console.log("Payload", payload);
    });
  }, []);

  return (
    <div>
      <Container maxWidth={false}>
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
