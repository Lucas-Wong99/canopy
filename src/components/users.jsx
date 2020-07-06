import React from "react";

function User(props) {
  return (
    <div>
      <ul>
        <li>{props.first}</li>
        <li>{props.last}</li>
      </ul>
    </div>
  );
}

export default User;
