import React from "react";
import { Box } from "grommet";
import { functions } from "../firebase";

function CreateStatus() {
  const [user, setUser] = React.useState("");

  const addStatus = (status) => {
    const createStatus = functions.httpsCallable("addStatus");
    createStatus({
      status,
    })
      .then((res) => {
        console.log("USERNAME!!!!", res.data.user_name);
        setUser(res.data.user_name);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <article>
      <Box
        border={{ size: "small", color: "black" }}
        pad="xsmall"
        margin="small"
      >
        <div>
          <button onClick={() => addStatus("A little tired need coffee")}>
            coffee break
          </button>
          <button onClick={() => addStatus("A little tired need coffee")}>
            coffee break
          </button>
          {/* <button onClick={() => addStatus()}>looking to chat</button> */}
        </div>
      </Box>
    </article>
  );
}

export default CreateStatus;
