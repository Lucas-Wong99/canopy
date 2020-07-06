import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Status(props) {
  const [status, setStatus] = useState([]);
  // const { userId } = props;

  useEffect(() => {
    return (
      db
        .collection("Status")
        .orderBy("date_created")
        // .limitToFirst(1)
        .onSnapshot((snapshot) => {
          let statusData = [];
          snapshot.forEach((doc) =>
            statusData.push({
              id: doc.id,
              status: doc.data().status,
              date_created: doc.data().date_created,
              first_name: doc.data().user
            })
          );
          setStatus(statusData);
        })
    );
  }, []);

  console.log(status);
  return <p>{status}</p>;
}

export default Status;
