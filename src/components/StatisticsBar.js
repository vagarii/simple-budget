import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {useQuery} from "@apollo/react-hooks";
import {Layout, Text, Icon, Button} from "@ui-kitten/components";
import {StackedBarChart, Grid} from "react-native-svg-charts";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {GET_SPENDING_ITEMS_AGGREGATE} from "../../data/queries";
import {getRroundNumberInteger} from "../utils/utils";

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

  const {loading, error, data} = useQuery(GET_SPENDING_ITEMS_AGGREGATE, {
    variables: {
      category_id: categoryId,
      spending_date_start: range.startDate,
      spending_date_end: range.endDate
    }
  });
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  const spentSum = (data?.spending_item ?? []).reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const daysInRange =
    moment(range.endDate).diff(moment(range.startDate), "day") + 1;

  // TODO: make this utils
  const getTotalTargetBudget = () => {
    if (isRandomRange) {
      return daysInRange * budgetAmountPerDay;
    }
    if (daysInRange == 7) {
      // WEEK
      switch (budgetTimeDuration) {
        case "Week":
          return budgetAmount;
        default:
          return daysInRange * budgetAmountPerDay;
      }
    } else if (28 <= daysInRange && daysInRange <= 31) {
      // MONTH
      switch (budgetTimeDuration) {
        case "MONTH":
          return budgetAmount;
        case "QUARTER":
          return budgetAmount / 3;
        case "YEAR":
          return budgetAmount / 12;
        default:
          return daysInRange * budgetAmountPerDay;
      }
    } else if (120 <= daysInRange && daysInRange <= 122) {
      // QUARTER
      switch (budgetTimeDuration) {
        case "MONTH":
          return budgetAmount * 3;
        case "QUARTER":
          return budgetAmount;
        case "YEAR":
          return budgetAmount / 4;
        default:
          return daysInRange * budgetAmountPerDay;
      }
    } else if (daysInRange == 365 || daysInRange == 366) {
      // YEAR
      switch (budgetTimeDuration) {
        case "MONTH":
          return budgetAmount * 12;
        case "QUARTER":
          return budgetAmount * 4;
        case "YEAR":
          return budgetAmount;
        default:
          return daysInRange * budgetAmountPerDay;
      }
    } else {
      return daysInRange * budgetAmountPerDay;
    }
  };

  const budgetSum = getTotalTargetBudget();

  const isOver = spentSum > budgetSum;
  const spentToBudget = spentSum / budgetSum;

  const barData = [
    {
      spent: !isOver ? spentSum : budgetSum,
      left: !isOver ? budgetSum - spentSum : 0,
      over: !isOver ? 0 : spentSum - budgetSum
    }
  ];

  const CateAvatar = () => (
    <Layout
      style={{
        backgroundColor: color,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12
      }}
    >
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

  return (
    <Layout style={styles.container}>
      <CateAvatar />
      <StackedBarChart
        style={{
          height: 50,
          width: BAR_WIDTH
        }}
        keys={["spent", "left"]}
        colors={[color2, color3]}
        data={[
          {
            spent: !isOver ? spentSum : budgetSum,
            left: !isOver ? budgetSum - spentSum : 0
          }
        ]}
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
  text: {
    alignItems: "flex-end",
    width: 64
  }
});
export default StatisticsBar;
