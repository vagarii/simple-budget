import React, {useState, useEffect} from "react";
import {StyleSheet, Dimensions, ScrollView} from "react-native";
import {useQuery} from "@apollo/react-hooks";
import {Layout, Text, Icon, Button} from "@ui-kitten/components";
import {StackedBarChart, Grid} from "react-native-svg-charts";
import {GET_SPENDING_CATEGORIES} from "../../data/queries";
import StatisticsBar from "./StatisticsBar";

const StatisticsCharts = ({range, isRandomRange, user}) => {
  const {loading, error, data: categories} = useQuery(GET_SPENDING_CATEGORIES, {
    variables: {user_id: user.id}
  });
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  return (
    <Layout style={styles.container}>
      <ScrollView>
        {(categories?.spending_category ?? []).map(category => (
          <StatisticsBar
            key={category.id}
            category={category}
            range={range}
            isRandomRange={isRandomRange}
          />
        ))}
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
  }
});

export default StatisticsCharts;
