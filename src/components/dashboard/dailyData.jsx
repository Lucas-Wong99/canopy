import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db, functions } from "../../firebase";
// import { Timestamp } from "@google-cloud/firestore";

const weekly = {
  labels: ["Self-care", "Heads down work", "Collaboration"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00"],
      hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
      data: [0, 0, 0],
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  dataVis: {
    display: "flex",
  },
  daily: {
    // display: "flex",
  },
}));

function DataVis() {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [work, setWork] = useState(0);
  const [coffee, setCoffee] = useState(0);
  const [social, setSocial] = useState(0);

  const daily = {
    labels: ["Self-care", "Heads down work", "Collaboration"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
        data: [social, work, coffee],
      },
    ],
  };

  const accessId = () => {
    const getUserId = functions.httpsCallable("getUserId");
    getUserId()
      .then((data) => {
        setUser(data.data.userId);
        // return data.data.userId;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    accessId();
  }, []);

  useEffect(() => {
    return db
      .collection("Status")
      .where("user_name", "==", user)
      .onSnapshot((snapshot) => {
        const socialArr = [];
        const coffeeArr = [];
        const workArr = [];
        snapshot.forEach((doc) => {
          const now = new Date();
          const lastMidnight = now.setHours(0, 0, 0, 0) / 1000;
          if (
            doc.data().date_created.seconds > lastMidnight &&
            doc.data().status === "needs a social break!"
          ) {
            socialArr.push(doc.data());
          }
          if (
            doc.data().date_created.seconds > lastMidnight &&
            doc.data().status === "Is taking a coffee break. You should come!"
          ) {
            coffeeArr.push(doc.data());
          }
          if (
            doc.data().date_created.seconds > lastMidnight &&
            doc.data().status ===
              "is starting a about to start a deep work session"
          ) {
            workArr.push(doc.data());
          }
        });
        setSocial(socialArr.length);
        setWork(workArr.length);
        setCoffee(coffeeArr.length);
      });
  }, [user]);

  return (
    <Grid container className={classes.dataVis}>
      <Grid item className={classes.daily}>
        <Pie
          data={daily}
          // height={50}
          // width={50}
          options={{
            title: {
              display: true,
              text: "Breakdown of your day",
              fontSize: 10,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
        <Pie
          data={weekly}
          // height={50}
          // width={50}
          options={{
            title: {
              display: true,
              text: "Breakdown of your day",
              fontSize: 10,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default DataVis;
