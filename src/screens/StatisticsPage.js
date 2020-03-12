import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {StyleSheet, Dimensions} from "react-native";
import {Layout, Text} from "@ui-kitten/components";
import StatisticsTimeRangePicker from "../components/StatisticsTimeRangePicker";
import StatisticsCharts from "../components/StatisticsCharts";

const StatisticsPage = ({user, homePageIndex}) => {
  const [range, setRange] = useState({});
  const [isRandomRange, setIsRandomRange] = useState(null);

  const setStatisticsRange = (range, isRandom) => {
    setRange(range);
    setIsRandomRange(isRandom);
  };

  return (
    <Layout style={styles.container}>
      <Text category="h5" style={{marginBottom: 8}}>{`My Budget Tracker`}</Text>
      <StatisticsCharts
        range={range}
        isRandomRange={isRandomRange === true}
        user={user}
        homePageIndex={homePageIndex}
      />
      <StatisticsTimeRangePicker setStatisticsRange={setStatisticsRange} />
    </Layout>
  );
};

const winHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    height: winHeight - 70,
    alignItems: "center"
  }
});

StatisticsPage.propTypes = {
  user: PropTypes.object.isRequired,
  homePageIndex: PropTypes.number.isRequired
};

export default StatisticsPage;
