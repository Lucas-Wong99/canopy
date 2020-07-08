import React from "react";
import Dashboard from "./dashboard/dashboard";
// import { auth } from "../firebase";
// import { Grommet } from "grommet";
import { Container } from "@material-ui/core";

function App() {
  return (
    <div height="90vh">
      <Container maxWidth="false" maxHeight="100%">
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
