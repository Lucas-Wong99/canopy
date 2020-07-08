import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import User from "./users";

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
            current_status: doc.data().current_status
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
      />
    );
  });

  return <div className="AvatarDisplay">{usersArr}</div>;
}

export default Avatar_Display;
