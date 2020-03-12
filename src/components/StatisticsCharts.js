import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {StyleSheet, Dimensions, ScrollView} from "react-native";
import {useQuery} from "@apollo/react-hooks";
import {Layout, Text} from "@ui-kitten/components";
import {GET_SPENDING_CATEGORIES} from "../../data/queries";
import StatisticsBar from "./StatisticsBar";

const StatisticsCharts = ({user, range, isRandomRange, homePageIndex}) => {
  const {loading, error, data: categories, refetch} = useQuery(
    GET_SPENDING_CATEGORIES,
    {
      variables: {user_id: user.id}
    }
  );
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  useEffect(() => {
    refetch();
  }, [range, homePageIndex]);

  return (
    <Layout style={styles.container}>
      <ScrollView>
        {(categories?.spending_category ?? []).map(category => (
          <StatisticsBar
            key={category.id}
            category={category}
            range={range}
            isRandomRange={isRandomRange}
            homePageIndex={homePageIndex}
          />
        ))}
      </ScrollView>
    </Layout>
  );
};

const winHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12,
    height: winHeight - 268
  }
});

StatisticsCharts.propTypes = {
  user: PropTypes.object.isRequired,
  range: PropTypes.object.isRequired,
  isRandomRange: PropTypes.bool.isRequired,
  homePageIndex: PropTypes.number.isRequired
};

export default StatisticsCharts;
