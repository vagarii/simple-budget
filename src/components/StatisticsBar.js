import React from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {useQuery} from "@apollo/react-hooks";
import {Layout, Text, Icon} from "@ui-kitten/components";
import {StackedBarChart} from "react-native-svg-charts";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {GET_SPENDING_ITEMS_AGGREGATE} from "../../data/queries";
import {getRroundNumberInteger, getTotalTargetBudget} from "../utils/utils";

const moment = require("moment");

const BAR_WIDTH = 230;

const StatisticsBar = ({category, range, isRandomRange}) => {
  const {
    id: categoryId,
    name: categoryName,
    budget_amount: budgetAmount,
    budget_amount_per_day: budgetAmountPerDay,
    budget_time_duration: budgetTimeDuration,
    category_icon: categoryIcon
  } = category;
  const {id: iconId, name: iconName, color, color2, color3} = categoryIcon;

  const {
    loading: loadingAggregate,
    error: errorOnAggregate,
    data: aggregateData
  } = useQuery(GET_SPENDING_ITEMS_AGGREGATE, {
    variables: {
      category_id: categoryId,
      spending_date_start: range.startDate,
      spending_date_end: range.endDate
    }
  });
  if (errorOnAggregate)
    return <Text>{`Error! ${errorOnAggregate.message}`}</Text>;

  const spentSum =
    aggregateData?.spending_item_aggregate?.aggregate?.sum?.amount ?? 0;

  const daysInRange =
    moment(range.endDate).diff(moment(range.startDate), "day") + 1;

  const budgetSum = getTotalTargetBudget(
    isRandomRange,
    budgetAmount,
    budgetTimeDuration,
    daysInRange,
    budgetAmountPerDay
  );

  const isOver = spentSum > budgetSum;

  const CateAvatar = () => (
    <Layout style={{...styles.avatar, backgroundColor: color}}>
      <FontAwesome5 name={iconName} color="white" size={25} solid />
    </Layout>
  );

  const BudgetText = () => (
    <Layout style={styles.text}>
      <Text
        category="s1"
        status={isOver ? "danger" : "basic"}
      >{`\$${getRroundNumberInteger(spentSum)}`}</Text>
      <Text category="s2">{`/ \$${getRroundNumberInteger(budgetSum)}`}</Text>
    </Layout>
  );

  const barKeys = ["spent", "left"];
  const barColors = [color2, color3];
  const barData = [
    {
      spent: !isOver ? spentSum : budgetSum,
      left: !isOver ? budgetSum - spentSum : 0
    }
  ];

  return (
    <Layout style={styles.container}>
      <CateAvatar />
      <StackedBarChart
        style={styles.bar}
        keys={barKeys}
        colors={barColors}
        data={barData}
        horizontal={true}
        contentInset={{top: 8, bottom: 8}}
      />
      <BudgetText />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 360,
    height: 60
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  bar: {
    height: 50,
    width: BAR_WIDTH
  },
  text: {
    alignItems: "flex-end",
    width: 64
  }
});

StatisticsBar.propTypes = {
  category: PropTypes.object.isRequired,
  range: PropTypes.object.isRequired,
  isRandomRange: PropTypes.bool.isRequired
};

export default StatisticsBar;
