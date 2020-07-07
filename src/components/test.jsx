import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import User from "./users";

function Test() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    return db
      .collection("Users")
      .orderBy("first_name")
      .onSnapshot((snapshot) => {
        const userData = [];
        snapshot.forEach((doc) =>
          userData.push({
            id: doc.id,
            first_name: doc.data().first_name,
            last_name: doc.data().last_name,
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
        first={user.first_name}
        last={user.last_name}
        current_status={user.current_status}
      />
    );
  });

  return (
    <div className="Test">
      <h1>Hello, Users!</h1>
      {usersArr}
    </div>
  );
}

export default Test;
