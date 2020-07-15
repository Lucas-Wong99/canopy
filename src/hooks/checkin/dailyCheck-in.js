import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    margin: theme.spacing(10),
    width: 400,
    height: 600
  },

  slider: {
    width: 300,
    height: theme.spacing(3)
  },

  sliderText: {
    marginTop: "35px"
  },

  button: {
    height: "20px",
    width: "100px"
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },

  navButton: {
    margin: theme.spacing(1),
    paddingRight: "15px"
  }
}));

const marks = [
  {
    value: 1,
    label: "1"
  },
  {
    value: 2,
    label: "2"
  },
  {
    value: 3,
    label: "3"
  },
  {
    value: 4,
    label: "4"
  },
  {
    value: 5,
    label: "5"
  },
  {
    value: 6,
    label: "6"
  },
  {
    value: 7,
    label: "7"
  },
  {
    value: 8,
    label: "8"
  },
  {
    value: 9,
    label: "9"
  },
  {
    value: 10,
    label: "10"
  }
];

export { useStyles, marks };
