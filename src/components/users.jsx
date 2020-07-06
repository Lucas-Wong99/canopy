import React from "react";

function User({ first, last, current_status }) {
  return (
    <div>
      <ul>
        <li>
          {first + " "}
          {last}
        </li>
        <li>{current_status}</li>
      </ul>
    </div>
  );
}

export default User;
