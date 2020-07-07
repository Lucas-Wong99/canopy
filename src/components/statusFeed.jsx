import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Status from "./status";

function StatusFeed() {
  const [statusFeed, setStatusFeed] = useState([]);

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
            user_name: doc.data().user_name
          })
        );
        setStatusFeed(statusData);
      });
  }, []);
  console.log(statusFeed);
  const statusArr = statusFeed.map((status) => {
    return (
      <Status
        key={status.id}
        status={status.status}
        date_created={status.date_created}
        user_name={status.user_name}
      />
    );
  });
  return (
    <div>
      <h4>Status</h4>
      {statusArr}
    </div>
  );
}

export default StatusFeed;
