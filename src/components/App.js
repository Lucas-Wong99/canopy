import React from "react";
import Dashboard from "./dashboard/dashboard";
// import { auth } from "../firebase";
import { Grommet } from "grommet";
import Box from "@material-ui/core/Box";

// const theme = {
//   global: {
//     font: {
//       family: "Roboto",
//       size: "14px",
//       height: "20px"
//     }
//   }
// };

function App() {
  return (
    <Grommet>
      <div className="App">
        <Dashboard />
      </div>
    </Grommet>
  );
}

export default App;
