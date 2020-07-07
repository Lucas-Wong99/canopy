import React from "react";
import Test from "./test";
import StatusFeed from "./statusFeed";
import CreateStatus from "./create_status";
import { Grommet, Grid, Box } from "grommet";
import { googleSignin, googleSignout } from "./google_btn";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
};

function App() {
  return (
    <Grommet theme>
      <div className="App">
        <Grid
          rows={["200px", "700px"]}
          columns={["fill"]}
          gap="small"
          areas={[
            { name: "header", start: [0, 0], end: [1, 0] },
            { name: "nav", start: [0, 1], end: [0, 1] },
            { name: "main", start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea="header"
            background="brand"
            direction="column"
            wrap="true"
            overflow="scroll"
            jus
            t
            ifyContent="between"
            align="start"
            pad={{
              top: "small",
              bottom: "small",
              left: "medium",
              right: "medium",
            }}
          >
            <Test />
          </Box>
          <Box
            gridArea="nav"
            background="light-5"
            overflow="scroll"
            pad="medium"
          >
            <CreateStatus />
            <StatusFeed />
          </Box>
          <Box gridArea="main" background="light-2">
            <button onClick={() => googleSignin()}>Google Signin</button>
            <button onClick={() => googleSignout()}>Google Signout</button>
          </Box>
        </Grid>
      </div>
    </Grommet>
  );
}

export default App;
