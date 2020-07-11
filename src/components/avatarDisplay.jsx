import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import User from "./users";
import { Grid } from "@material-ui/core";

function Avatar_Display() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    return db
      .collection("Users")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        const userData = [];
        snapshot.forEach((doc) =>
          userData.push({
            id: doc.id,
            name: doc.data().name,
            photoURL: doc.data().photoURL,
            current_status: doc.data().current_status,
            token: doc.data().deviceToken
          })
        );
        setUsers(userData);
      });
  }, []);

  const usersArr = users.map((user) => {
    return (
      <User
        key={user.id}
        id={user.id}
        name={user.name}
        photoURL={user.photoURL}
        current_status={user.current_status}
        token={user.token}
      />
    );
  });

  return (
    <Grid container direction="row" className="AvatarDisplay">
      {usersArr}
    </Grid>
  );
}

export default Avatar_Display;
