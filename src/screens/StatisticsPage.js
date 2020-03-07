import React, {useState, useEffect} from "react";
import {StyleSheet, ActivityIndicator, Dimensions} from "react-native";
import {Layout, Text, Icon, Button} from "@ui-kitten/components";
import {StackedBarChart, Grid} from "react-native-svg-charts";
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
      <Text category="h5">{`Welcome  ${user.name}`}</Text>
      <StatisticsCharts
        range={range}
        isRandomRange={isRandomRange}
        user={user}
      />
      <StatisticsTimeRangePicker setStatisticsRange={setStatisticsRange} />
    </Layout>
  );
};

const winWidth = Dimensions.get("window").width; //full width
const winHeight = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  container: {
    height: winHeight - 60,
    alignItems: "center"
    // justifyContent: "center"
  }
});

export default StatisticsPage;
