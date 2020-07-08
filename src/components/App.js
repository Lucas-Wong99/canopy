import React from "react";
import Dashboard from "./dashboard/dashboard";
// import { auth } from "../firebase";
// import { Grommet } from "grommet";
import { Container, Grid } from "@material-ui/core";

function App() {
  return (
    <Grid container>
      <div className="App">
        <Dashboard />
      </div>
    </Grid>
  );
}

export default App;
