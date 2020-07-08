import React from "react";
import Dashboard from "./dashboard/dashboard";
// import { auth } from "../firebase";
// import { Grommet } from "grommet";
import { Container } from "@material-ui/core";

function App() {
  return (
    <div>
      <Container maxWidth={false}>
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
