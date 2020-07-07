import React from "react";
import moment from "moment";

function Status({ date_created, user_name, status }) {
  return (
    <article>
      <div>
        <h4>{user_name}</h4>
      </div>
      <div>{status}</div>
      {moment(date_created.toDate()).fromNow()}
    </article>
  );
}

export default Status;
