import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Status from "./status";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function StatusFeed({ setStatusCount }) {
  const [statusFeed, setStatusFeed] = useState([]);

  // Could refactor to only query for the last 10 or something
  useEffect(() => {
    return db
      .collection("Status")
      .orderBy("date_created")
      .onSnapshot((snapshot) => {
        const statusData = [];
        snapshot.forEach((doc) =>
          statusData.push({
            id: doc.id,
            status: doc.data().status,
            date_created: doc.data().date_created,
            user_name: doc.data().user_name,
            claps: doc.data().claps,
          })
        );
        setStatusFeed(statusData);
        setStatusCount(statusData.length);
      });
  }, []);

  const statusArr = statusFeed.map((status) => {
    return (
      <Status
        key={status.id}
        id={status.id}
        status={status.status}
        date_created={status.date_created}
        user_name={status.user_name}
        claps={status.claps}
      />
    );
  });
  return <div>{statusArr.reverse()}</div>;
}

export default StatusFeed;
