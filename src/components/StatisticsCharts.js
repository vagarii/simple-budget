import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from "react-native";
import {Layout, Text, Icon, Button} from "@ui-kitten/components";
import {StackedBarChart, Grid} from "react-native-svg-charts";

const StatisticsCharts = ({range, isRandomRange}) => {
  console.warn(range);
  console.warn(isRandomRange);

  const data = [
    {
      spentUderTarget: 3840,
      target: 1920,
      spentOverTarget: 960
    }
  ];

  const colors = ["#7b4173", "#a55194", "#ce6dbd"];
  const keys = ["spentUderTarget", "target", "spentOverTarget"];

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <StackedBarChart
          style={styles.bar}
          keys={keys}
          colors={colors}
          data={data}
          horizontal={true}
          contentInset={{top: 8, bottom: 8}}
        />
        <StackedBarChart
          style={styles.bar}
          keys={keys}
          colors={colors}
          data={data}
          horizontal={true}
          contentInset={{top: 8, bottom: 8}}
        />
      </ScrollView>
    </Layout>
  );
};

const winHeight = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12,
    height: winHeight - 320
  },
  bar: {
    height: 50,
    width: 344
  }
});

export default StatisticsCharts;
