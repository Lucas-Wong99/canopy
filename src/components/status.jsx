import React from "react";

function Status({ date_created, user_name, status }) {
  return (
    <article>
      <div>
        <h4>{user_name}</h4>
      </div>
      <div>{status}</div>
      {new Date(date_created.seconds * 1000).toLocaleDateString("en-US")}
    </article>
  );
}

export default Status;
