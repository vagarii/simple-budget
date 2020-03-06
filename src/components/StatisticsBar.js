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

const moment = require("moment");

const BAR_WIDTH = 230;

const StatisticsBar = ({
  category,
  range,
  isRandomRange,
  barMaxWidthPercentage,
  setBarMaxWidthPercentage
}) => {
  const {
    id: categoryId,
    name: categoryName,
    budget_amount: budgetAmount,
    budget_amount_per_day: budgetAmountPerDay,
    budget_time_duration: budgetTimeDuration,
    category_icon: categoryIcon
  } = category;

  const {id: iconId, name: iconName, color, color2} = categoryIcon;

  const {loading, error, data} = useQuery(GET_SPENDING_ITEMS_AGGREGATE, {
    variables: {
      category_id: categoryId,
      spending_date_start: range.startDate,
      spending_date_end: range.endDate
    }
  });
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  // useEffect(() => {
  //   // console.warn(barMaxWidthPercentage);
  //   // console.warn(data);
  //   // setMonthAndClear({text: "This Month"});
  // }, [barMaxWidthPercentage]);

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

  const totalTargetSum = getTotalTargetBudget();

  const isOver = spentSum > totalTargetSum;

  if (isOver) {
    setBarMaxWidthPercentage(spentSum / totalTargetSum);
  }

  const barData = [
    {
      spent: !isOver ? spentSum : totalTargetSum,
      left: !isOver ? totalTargetSum - spentSum : 0,
      over: !isOver ? 0 : spentSum - totalTargetSum
    }
  ];

  const colors = [color2, color, "rgba(0, 0, 0, 0.6)"];
  const keys = ["spent", "left", "over"];

  const CateAvatar = () => (
    <Layout
      style={{
        backgroundColor: color,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8
      }}
    >
      <FontAwesome5 name={iconName} color="white" size={20} solid />
    </Layout>
  );

  // TODO: utils
  const getRroundNumber = num => {
    return Math.round(num * 100) / 100;
  };

  const BudgetText = () => (
    <Layout style={styles.text}>
      <Text
        category="c2"
        status={isOver ? "danger" : "basic"}
      >{`\$${getRroundNumber(spentSum)}`}</Text>
      <Text category="c1">{`/ \$${getRroundNumber(totalTargetSum)}`}</Text>
    </Layout>
  );

  return (
    <Layout style={styles.container}>
      <CateAvatar />
      <Layout style={styles.barSet}>
        <StackedBarChart
          style={{
            height: 50,
            width: BAR_WIDTH / barMaxWidthPercentage
          }}
          keys={["spent", "left"]}
          colors={[color2, color]}
          data={[
            {
              spent: !isOver ? spentSum : totalTargetSum,
              left: !isOver ? totalTargetSum - spentSum : 0
            }
          ]}
          horizontal={true}
          contentInset={{top: 8, bottom: 8}}
        />
        {isOver && (
          <StackedBarChart
            style={{
              height: 50,
              width:
                ((spentSum - totalTargetSum) / totalTargetSum) *
                (BAR_WIDTH / barMaxWidthPercentage)
            }}
            keys={["over"]}
            colors={["rgba(0, 0, 0, 0.6)"]}
            data={[
              {
                over: spentSum - totalTargetSum
              }
            ]}
            horizontal={true}
            contentInset={{top: 8, bottom: 8}}
          />
        )}
      </Layout>
      <BudgetText />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 344
  },
  barSet: {
    flexDirection: "row",
    alignItems: "center",
    width: BAR_WIDTH
  },
  text: {
    alignItems: "flex-end",
    width: 70
  }
});
export default StatisticsBar;
