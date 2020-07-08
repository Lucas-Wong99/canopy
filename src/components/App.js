import React from "react";
import Dashboard from "./dashboard/dashboard";
// import { auth } from "../firebase";
// import { Grommet } from "grommet";
import { Container } from "@material-ui/core";

function App() {
  return (
    <Container maxWidth="false">
      <div className="App">
        <Dashboard />
      </div>
    </Container>
  );
}

export default App;
