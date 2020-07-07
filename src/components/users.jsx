import React from "react";

function User({ first, last, current_status }) {
  return (
    <ul>
      <li>
        {first + " "}
        {last}
      </li>
      <li>{current_status}</li>
    </ul>
  );
}

export default User;
