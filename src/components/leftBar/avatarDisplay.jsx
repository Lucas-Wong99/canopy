import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import User from "../users";
import { Grid } from "@material-ui/core";

function Avatar_Display({ currentUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    return db
      .collection("Users")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        const userData = [];
        const currentUserData = [];
        snapshot.forEach((doc) => {
          if (doc.data().name === currentUser) {
            currentUserData.push({
              id: doc.id,
              name: doc.data().name,
              photoURL: doc.data().photoURL,
              current_status: doc.data().current_status,
              token: doc.data().deviceToken
            });
          } else {
            userData.push({
              id: doc.id,
              name: doc.data().name,
              photoURL: doc.data().photoURL,
              current_status: doc.data().current_status,
              token: doc.data().deviceToken
            });
          }
        });
        const order = [...currentUserData, ...userData];
        setUsers(order);
      });
  }, [currentUser]);

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
