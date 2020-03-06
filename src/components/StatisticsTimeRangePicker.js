import React, {useState, useEffect} from "react";
import {StyleSheet, ActivityIndicator} from "react-native";
import {
  Layout,
  Text,
  Icon,
  Button,
  RangeDatepicker,
  Select
} from "@ui-kitten/components";
const moment = require("moment");

// TODO: use enums or fixed object for picker options
const StatisticsTimeRangePicker = ({setStatisticsRange}) => {
  const [week, setWeek] = useState(null);
  const [month, setMonth] = useState(null);
  const [quarter, setQuarter] = useState(null);
  const [year, setYear] = useState(null);
  const [randomRange, setRandomRange] = useState({});

  useEffect(() => {
    setMonthAndClear({text: "This Month"});
  }, []);

  const setRandomRangeAndClear = data => {
    setRandomRange(data);
    if (data.endDate != null) {
      setWeek(null);
      setMonth(null);
      setQuarter(null);
      setYear(null);
      setStatisticsRange(data, true);
    }
  };

  const setWeekAndClear = data => {
    setWeek(data);
    setMonth(null);
    setQuarter(null);
    setYear(null);
    setRandomRange({});
    switch (data.text) {
      case "This Week":
        setStatisticsRange(
          {
            startDate: moment().startOf("week"),
            endDate: moment().endOf("week")
          },
          false
        );
        break;
      case "Prev Week":
        setStatisticsRange(
          {
            startDate: moment()
              .subtract(1, "week")
              .startOf("week"),
            endDate: moment()
              .subtract(1, "week")
              .endOf("week")
          },
          false
        );
        break;
    }
  };

  const setMonthAndClear = data => {
    setWeek(null);
    setMonth(data);
    setQuarter(null);
    setYear(null);
    setRandomRange({});
    switch (data.text) {
      case "This Month":
        setStatisticsRange(
          {
            startDate: moment().startOf("month"),
            endDate: moment().endOf("month")
          },
          false
        );
        break;
      case "Prev Month":
        setStatisticsRange(
          {
            startDate: moment()
              .subtract(1, "month")
              .startOf("month"),
            endDate: moment()
              .subtract(1, "month")
              .endOf("month")
          },
          false
        );
        break;
    }
  };

  const setQuarterAndClear = data => {
    setWeek(null);
    setMonth(null);
    setQuarter(data);
    setYear(null);
    setRandomRange({});
    switch (data.text) {
      case "This Quarter":
        setStatisticsRange(
          {
            startDate: moment().startOf("quarter"),
            endDate: moment().endOf("quarter")
          },
          false
        );
        break;
      case "Prev Quarter":
        setStatisticsRange(
          {
            startDate: moment()
              .subtract(1, "quarter")
              .startOf("quarter"),
            endDate: moment()
              .subtract(1, "quarter")
              .endOf("quarter")
          },
          false
        );
        break;
    }
  };

  const setYearAndClear = data => {
    setWeek(null);
    setMonth(null);
    setQuarter(null);
    setYear(data);
    setRandomRange({});
    switch (data.text) {
      case "This Year":
        setStatisticsRange(
          {
            startDate: moment().startOf("year"),
            endDate: moment().endOf("year")
          },
          false
        );
        break;
      case "Prev Year":
        setStatisticsRange(
          {
            startDate: moment()
              .subtract(1, "year")
              .startOf("year"),
            endDate: moment()
              .subtract(1, "year")
              .endOf("year")
          },
          false
        );
        break;
    }
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.pickersRow}>
        <Select
          style={styles.picker}
          data={[{text: "This Week"}, {text: "Prev Week"}]}
          placeholder="WEEK"
          status={week == null ? "basic" : "success"}
          selectedOption={week}
          onSelect={setWeekAndClear}
        />
        <Select
          style={styles.picker}
          data={[{text: "This Month"}, {text: "Prev Month"}]}
          status={month == null ? "basic" : "success"}
          placeholder="MONTH"
          selectedOption={month}
          onSelect={setMonthAndClear}
        />
      </Layout>
      <Layout style={styles.pickersRow}>
        <Select
          style={styles.picker}
          data={[{text: "This Quarter"}, {text: "Prev Quarter"}]}
          status={quarter == null ? "basic" : "success"}
          placeholder="QUARTER"
          selectedOption={quarter}
          onSelect={setQuarterAndClear}
        />
        <Select
          style={styles.picker}
          data={[{text: "This Year"}, {text: "Prev Year"}]}
          status={year == null ? "basic" : "success"}
          placeholder="YEAR"
          selectedOption={year}
          onSelect={setYearAndClear}
        />
      </Layout>
      <RangeDatepicker
        style={styles.rangePicker}
        range={randomRange}
        status={
          randomRange == null || randomRange?.endDate == null
            ? "basic"
            : "success"
        }
        onSelect={setRandomRangeAndClear}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
    alignItems: "center"
  },
  pickersRow: {
    flexDirection: "row",
    marginVertical: 4,
    width: 352
  },
  picker: {
    flex: 1,
    marginHorizontal: 4
  },
  rangePicker: {
    marginVertical: 4,
    width: 344
  }
});

export default StatisticsTimeRangePicker;
