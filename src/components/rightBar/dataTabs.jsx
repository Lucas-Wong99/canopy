import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Box, Grid } from "@material-ui/core";
import DailyDataVis from "./data/dailyData";
import WaterBar from "./data/waterData";
import StretchBar from "./data/stretchData";
import WeeklyDataVis from "./data/weeklyData";
import CheckinData from "./data/checkinData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    font: theme.typography.fontFamily
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    height: "100%"
  },
  title: {
    margin: 0
  },
  trackers: {
    margin: "50px"
  },
  trends: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
}));

export default function VerticalTabs({
  workDay,
  socialDay,
  coffeeDay,
  username,
  workWeek,
  socialWeek,
  coffeeWeek
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Trackers" {...a11yProps(0)} />
        <Tab label="Trends" {...a11yProps(1)} />
        <Tab label="Weekly Trends" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid item>
          <Box className={classes.trackers}>
            <h4 className={classes.title}>Daily Water Intake</h4>
            <WaterBar username={username} />
          </Box>
          <Box className={classes.trackers}>
            <h4 className={classes.title}>Daily Stretch Quota</h4>
            <StretchBar username={username} />
          </Box>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h4 className={classes.title}>Daily & Weekly Trends</h4>
        <Grid item className={classes.trends}>
          <DailyDataVis
            workDay={workDay}
            socialDay={socialDay}
            coffeeDay={coffeeDay}
          />
          <WeeklyDataVis
            workWeek={workWeek}
            socialWeek={socialWeek}
            coffeeWeek={coffeeWeek}
          />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CheckinData username={username} />
      </TabPanel>
    </div>
  );
}
