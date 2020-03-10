import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {StyleSheet, Dimensions} from "react-native";
import {Layout, Text} from "@ui-kitten/components";
import StatisticsTimeRangePicker from "../components/StatisticsTimeRangePicker";
import StatisticsCharts from "../components/StatisticsCharts";
import Store from "../store/Store";

const StatisticsPage = ({user}) => {
  const [range, setRange] = useState({});
  const [isRandomRange, setIsRandomRange] = useState(null);

  const setStatisticsRange = (range, isRandom) => {
    setRange(range);
    setIsRandomRange(isRandom);
    Store.save("range", range).then();
  };

  return (
    <Layout style={styles.container}>
      <Text category="h5" style={{marginBottom: 8}}>{`My Budget Tracker`}</Text>
      <StatisticsCharts
        range={range}
        isRandomRange={isRandomRange === true}
        user={user}
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
  user: PropTypes.object.isRequired
};

export default StatisticsPage;
