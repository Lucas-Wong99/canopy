import React from "react";
import { Grid, Box } from "grommet";
import StatusFeed from "../statusFeed";
import { googleSignin } from "../google_btn";
import CreateStatus from "../createStatus";
import AvatarDisplay from "../avatarDisplay";

function Dashboard() {
  return (
    <Grid
      rows={["150px", "fill"]}
      columns={["fill"]}
      gap="small"
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "nav", start: [0, 1], end: [0, 1] },
        { name: "main", start: [1, 1], end: [1, 1] }
      ]}
    >
      <Box
        gridArea="header"
        background="black"
        direction="column"
        overflow="scroll"
        justifyContent="between"
        align="start"
        pad={{
          top: "small",
          bottom: "small",
          left: "medium",
          right: "medium"
        }}
      >
        <h1>Hello, Users!</h1>
        <h1>Welcome To Canopy</h1>
        <button onClick={() => googleSignin()}>Google Signin</button>
      </Box>
      <Box gridArea="nav" background="light-5" overflow="scroll" pad="medium">
        <AvatarDisplay />
      </Box>
      <Box gridArea="main" background="light-2">
        <CreateStatus />
        <StatusFeed />
      </Box>
    </Grid>
  );
}

export default Dashboard;
